import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageCircle, AlertCircle, FileText, FlaskConical, BookOpen, Handshake } from 'lucide-react';

// ── Delivery channels ─────────────────────────────────────────────────────────
// Enquiries are handed off to WhatsApp / email with all fields pre-filled — no
// backend required. Update these two constants to re-point every form at once.
const WHATSAPP_NUMBER = '971561117261'; // +971 56 111 7261 — digits only for wa.me
const CONTACT_EMAIL = 'info@medist.ae';

const FIELD_LABELS: Record<string, string> = {
  fullName: 'Name', contactName: 'Contact Name', company: 'Company', country: 'Country',
  email: 'Email', phone: 'Phone', product: 'Product / Ingredient', quantity: 'Quantity',
  message: 'Details', address: 'Shipping Address', docType: 'Document Type', notes: 'Notes',
  region: 'Region / Market', companyType: 'Company Type',
};

const DOC_TYPE_LABELS: Record<string, string> = {
  sds: 'Safety Data Sheet (SDS / MSDS)', tds: 'Technical Data Sheet (TDS)',
  coa: 'Certificate of Analysis (CoA)', both: 'SDS + TDS', all: 'All available documents',
};

const COMPANY_TYPE_LABELS: Record<string, string> = {
  distributor: 'Distributor / Agent', manufacturer: 'Manufacturer / Supplier',
  consultant: 'Regulatory Consultant', logistics: 'Logistics Provider', other: 'Other',
};

function buildMessage(subject: string, values: Record<string, string>) {
  const lines = Object.entries(values)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => {
      const label = FIELD_LABELS[k] ?? k;
      const val = k === 'docType' ? (DOC_TYPE_LABELS[v] ?? v)
        : k === 'companyType' ? (COMPANY_TYPE_LABELS[v] ?? v)
        : v;
      return `${label}: ${val}`;
    });
  return `Medist enquiry — ${subject}\n\n${lines.join('\n')}`;
}

type DeliveryLinks = { wa: string; mail: string };

function buildLinks(subject: string, values: Record<string, string>): DeliveryLinks {
  const body = buildMessage(subject, values);
  return {
    wa: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`,
    mail: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Medist enquiry — ${subject}`)}&body=${encodeURIComponent(body)}`,
  };
}

// ── Tab config ───────────────────────────────────────────────────────────────
type TabKey = 'rfq' | 'sample' | 'sds' | 'partner';

const tabs: { key: TabKey; label: string; icon: React.ElementType; title: string; subtitle: string }[] = [
  {
    key: 'rfq',
    label: 'Request a Quote',
    icon: FileText,
    title: 'Request a Quote (RFQ)',
    subtitle: 'Tell us what you need and we\'ll respond with pricing, availability, and lead times within one business day.',
  },
  {
    key: 'sample',
    label: 'Request a Sample',
    icon: FlaskConical,
    title: 'Request a Sample',
    subtitle: 'Receive a lab-sized sample for evaluation. Our team will follow up to confirm product details and shipping.',
  },
  {
    key: 'sds',
    label: 'Request SDS / TDS',
    icon: BookOpen,
    title: 'Request SDS / TDS Documents',
    subtitle: 'Get Safety Data Sheets, Technical Data Sheets, or Certificates of Analysis for any product in our catalogue.',
  },
  {
    key: 'partner',
    label: 'Partner With Us',
    icon: Handshake,
    title: 'Become a Distribution Partner',
    subtitle: 'Interested in representing Medist or supplying through us? Share your details and we\'ll be in touch.',
  },
];

// ── Shared field component ────────────────────────────────────────────────────
function Field({
  label, name, type = 'text', value, error, onChange, onBlur, placeholder, required = false,
}: {
  label: string; name: string; type?: string; value: string; error?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  placeholder: string; required?: boolean;
}) {
  const cls = `w-full px-3 py-2.5 text-sm border rounded-md bg-white text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 transition ${
    error ? 'border-red-400 focus:ring-red-200' : 'border-[#e2e8f0] focus:ring-[#1558a7]/25 focus:border-[#1558a7]'
  }`;
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold text-[#374151] mb-1.5">
        {label}{required && ' *'}
      </label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} onBlur={onBlur}
        placeholder={placeholder} className={cls} aria-invalid={!!error} />
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={11} aria-hidden="true" />{error}
        </p>
      )}
    </div>
  );
}

function Textarea({
  label, name, value, error, onChange, onBlur, placeholder, rows = 4, required = false,
}: {
  label: string; name: string; value: string; error?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLTextAreaElement>;
  placeholder: string; rows?: number; required?: boolean;
}) {
  const cls = `w-full px-3 py-2.5 text-sm border rounded-md bg-white text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 transition resize-none ${
    error ? 'border-red-400 focus:ring-red-200' : 'border-[#e2e8f0] focus:ring-[#1558a7]/25 focus:border-[#1558a7]'
  }`;
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold text-[#374151] mb-1.5">
        {label}{required && ' *'}
      </label>
      <textarea id={name} name={name} rows={rows} value={value} onChange={onChange} onBlur={onBlur}
        placeholder={placeholder} className={cls} aria-invalid={!!error} />
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={11} aria-hidden="true" />{error}
        </p>
      )}
    </div>
  );
}

// ── Base form hook ─────────────────────────────────────────────────────────────
function useForm<T extends Record<string, string>>(subject: string, initial: T, requiredKeys: (keyof T)[]) {
  const [values, setValues]   = useState<T>(initial);
  const [errors, setErrors]   = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [status, setStatus]   = useState<'idle' | 'ready'>('idle');
  const [links, setLinks]     = useState<DeliveryLinks>({ wa: '', mail: '' });

  function validate(v: T) {
    const e: Partial<Record<keyof T, string>> = {};
    for (const k of requiredKeys) {
      if (!v[k]?.trim()) e[k] = 'Required';
    }
    if ('email' in v && v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email as string)) {
      (e as Record<string, string>).email = 'Invalid email';
    }
    return e;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (touched[e.target.name as keyof T]) setErrors(validate(next));
    if (status === 'ready') setLinks(buildLinks(subject, next)); // keep handoff links in sync if user edits after revealing them
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setTouched(t => ({ ...t, [e.target.name]: true }));
    setErrors(validate(values));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = Object.keys(initial).reduce((a, k) => ({ ...a, [k]: true }), {}) as Record<keyof T, boolean>;
    setTouched(allTouched);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLinks(buildLinks(subject, values));
    setStatus('ready');
  }

  return { values, errors, touched, status, links, handleChange, handleBlur, handleSubmit };
}

// ── RFQ Form ──────────────────────────────────────────────────────────────────
function RFQForm() {
  const initial = { fullName: '', company: '', country: '', email: '', phone: '', product: '', quantity: '', message: '' };
  const { values, errors, touched, status, links, handleChange, handleBlur, handleSubmit } = useForm(
    'Request a Quote (RFQ)', initial, ['fullName', 'company', 'email', 'product']
  );
  const p = (n: string) => ({ name: n, value: values[n as keyof typeof values], error: touched[n as keyof typeof values] ? errors[n as keyof typeof values] : undefined, onChange: handleChange as React.ChangeEventHandler<HTMLInputElement>, onBlur: handleBlur as React.FocusEventHandler<HTMLInputElement> });
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field {...p('fullName')}  label="Full Name"     placeholder="Mohsen Fesharaki"            required />
        <Field {...p('company')}   label="Company Name"  placeholder="Medist FZE"        required />
        <Field {...p('country')}   label="Country"       placeholder="UAE" />
        <Field {...p('email')}     label="Email"         type="email" placeholder="mohsen@company.ae" required />
        <Field {...p('phone')}     label="Phone"         type="tel" placeholder="+971 50 000 0000" />
        <Field {...p('product')}   label="Product / Ingredient" placeholder="e.g. Xanthan Gum" required />
        <Field {...p('quantity')}  label="Estimated Quantity"   placeholder="e.g. 500 kg/month" />
      </div>
      <Textarea {...{ name: 'message', value: values.message, error: touched.message ? errors.message : undefined, onChange: handleChange as React.ChangeEventHandler<HTMLTextAreaElement>, onBlur: handleBlur as React.FocusEventHandler<HTMLTextAreaElement> }}
        label="Additional Requirements" placeholder="Purity, grade, certification requirements..." />
      <SubmitRow status={status} links={links} label="Send RFQ" />
    </form>
  );
}

// ── Sample Form ───────────────────────────────────────────────────────────────
function SampleForm() {
  const initial = { fullName: '', company: '', email: '', phone: '', product: '', quantity: '', address: '' };
  const { values, errors, touched, status, links, handleChange, handleBlur, handleSubmit } = useForm(
    'Request a Sample', initial, ['fullName', 'company', 'email', 'product']
  );
  const p = (n: string) => ({ name: n, value: values[n as keyof typeof values], error: touched[n as keyof typeof values] ? errors[n as keyof typeof values] : undefined, onChange: handleChange as React.ChangeEventHandler<HTMLInputElement>, onBlur: handleBlur as React.FocusEventHandler<HTMLInputElement> });
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field {...p('fullName')}  label="Full Name"        placeholder="Mohsen Fesharaki"       required />
        <Field {...p('company')}   label="Company Name"     placeholder="Medist FZE"  required />
        <Field {...p('email')}     label="Email"            type="email" placeholder="mohsen@company.ae" required />
        <Field {...p('phone')}     label="Phone"            type="tel" placeholder="+971 50 000 0000" />
        <Field {...p('product')}   label="Product / Ingredient" placeholder="e.g. Carrageenan" required />
        <Field {...p('quantity')}  label="Sample Quantity"  placeholder="e.g. 100g / 500ml" />
      </div>
      <Textarea {...{ name: 'address', value: values.address, error: touched.address ? errors.address : undefined, onChange: handleChange as React.ChangeEventHandler<HTMLTextAreaElement>, onBlur: handleBlur as React.FocusEventHandler<HTMLTextAreaElement> }}
        label="Shipping Address" placeholder="Full delivery address including city, country, and postal code" rows={3} />
      <SubmitRow status={status} links={links} label="Request Sample" />
    </form>
  );
}

// ── SDS/TDS Form ──────────────────────────────────────────────────────────────
function SDSForm() {
  const initial = { fullName: '', company: '', email: '', product: '', docType: '', notes: '' };
  const { values, errors, touched, status, links, handleChange, handleBlur, handleSubmit } = useForm(
    'Request SDS / TDS Documents', initial, ['fullName', 'email', 'product', 'docType']
  );
  const p = (n: string) => ({ name: n, value: values[n as keyof typeof values], error: touched[n as keyof typeof values] ? errors[n as keyof typeof values] : undefined, onChange: handleChange as React.ChangeEventHandler<HTMLInputElement>, onBlur: handleBlur as React.FocusEventHandler<HTMLInputElement> });
  const selCls = `w-full px-3 py-2.5 text-sm border rounded-md bg-white text-[#1e293b] focus:outline-none focus:ring-2 transition ${touched.docType && errors.docType ? 'border-red-400 focus:ring-red-200' : 'border-[#e2e8f0] focus:ring-[#1558a7]/25 focus:border-[#1558a7]'}`;
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field {...p('fullName')}  label="Full Name"   placeholder="Mohsen Fesharaki"          required />
        <Field {...p('company')}   label="Company"     placeholder="Medist FZE" />
        <Field {...p('email')}     label="Email"       type="email" placeholder="mohsen@company.ae" required />
        <Field {...p('product')}   label="Product / Ingredient" placeholder="e.g. HPMC K100M" required />
        <div>
          <label htmlFor="docType" className="block text-xs font-semibold text-[#374151] mb-1.5">Document Type *</label>
          <select id="docType" name="docType" value={values.docType} onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>} onBlur={handleBlur as React.FocusEventHandler<HTMLSelectElement>} className={selCls}>
            <option value="">Select…</option>
            <option value="sds">Safety Data Sheet (SDS / MSDS)</option>
            <option value="tds">Technical Data Sheet (TDS)</option>
            <option value="coa">Certificate of Analysis (CoA)</option>
            <option value="both">SDS + TDS</option>
            <option value="all">All available documents</option>
          </select>
          {touched.docType && errors.docType && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{errors.docType}</p>
          )}
        </div>
      </div>
      <Textarea {...{ name: 'notes', value: values.notes, error: undefined, onChange: handleChange as React.ChangeEventHandler<HTMLTextAreaElement>, onBlur: handleBlur as React.FocusEventHandler<HTMLTextAreaElement> }}
        label="Additional Notes" placeholder="Specific grade, supplier, lot number, or format requirements…" rows={3} />
      <SubmitRow status={status} links={links} label="Request Documents" />
    </form>
  );
}

// ── Partner Form ──────────────────────────────────────────────────────────────
function PartnerForm() {
  const initial = { company: '', contactName: '', email: '', phone: '', region: '', companyType: '', message: '' };
  const { values, errors, touched, status, links, handleChange, handleBlur, handleSubmit } = useForm(
    'Become a Distribution Partner', initial, ['company', 'contactName', 'email']
  );
  const p = (n: string) => ({ name: n, value: values[n as keyof typeof values], error: touched[n as keyof typeof values] ? errors[n as keyof typeof values] : undefined, onChange: handleChange as React.ChangeEventHandler<HTMLInputElement>, onBlur: handleBlur as React.FocusEventHandler<HTMLInputElement> });
  const selCls = `w-full px-3 py-2.5 text-sm border rounded-md bg-white text-[#1e293b] focus:outline-none focus:ring-2 transition border-[#e2e8f0] focus:ring-[#1558a7]/25 focus:border-[#1558a7]`;
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field {...p('company')}     label="Company Name"    placeholder="Medist FZE"   required />
        <Field {...p('contactName')} label="Contact Name"    placeholder="Mohsen Fesharaki"     required />
        <Field {...p('email')}       label="Email"           type="email" placeholder="mohsen@company.ae" required />
        <Field {...p('phone')}       label="Phone"           type="tel" placeholder="+971 50 000 0000" />
        <div>
          <label htmlFor="companyType" className="block text-xs font-semibold text-[#374151] mb-1.5">Company Type</label>
          <select id="companyType" name="companyType" value={values.companyType} onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>} onBlur={handleBlur as React.FocusEventHandler<HTMLSelectElement>} className={selCls}>
            <option value="">Select…</option>
            <option value="distributor">Distributor / Agent</option>
            <option value="manufacturer">Manufacturer / Supplier</option>
            <option value="consultant">Regulatory Consultant</option>
            <option value="logistics">Logistics Provider</option>
            <option value="other">Other</option>
          </select>
        </div>
        <Field {...p('region')} label="Region / Market" placeholder="e.g. Saudi Arabia, Egypt" />
      </div>
      <Textarea {...{ name: 'message', value: values.message, error: undefined, onChange: handleChange as React.ChangeEventHandler<HTMLTextAreaElement>, onBlur: handleBlur as React.FocusEventHandler<HTMLTextAreaElement> }}
        label="Tell us about your business" placeholder="Products you handle, current markets, what you're looking for in a partnership…" rows={4} />
      <SubmitRow status={status} links={links} label="Submit Partnership Enquiry" />
    </form>
  );
}

// ── Submit row ────────────────────────────────────────────────────────────────
function SubmitRow({ status, links, label }: { status: 'idle' | 'ready'; links: DeliveryLinks; label: string }) {
  return (
    <div>
      <button type="submit" className="btn-primary px-8 py-3 text-sm">
        {label}
      </button>
      <AnimatePresence>
        {status === 'ready' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-4 p-5 bg-[#f0f9ff] border border-[#bae6fd] rounded-lg"
            role="status" aria-live="polite"
          >
            <p className="text-sm font-semibold text-[#0f1e35] mb-1">Almost there — choose how to send</p>
            <p className="text-xs text-[#64748b] mb-4">
              Your details are pre-filled. Pick a channel below and just hit send — we'll respond within one business day.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={links.wa} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1fb457] transition-colors"
              >
                <MessageCircle size={16} aria-hidden="true" /> Send via WhatsApp
              </a>
              <a
                href={links.mail}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#1558a7] text-[#1558a7] text-sm font-semibold hover:bg-[#eff6ff] transition-colors"
              >
                <Mail size={16} aria-hidden="true" /> Send via Email
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const typeParam = (searchParams.get('type') ?? 'rfq') as TabKey;
  const validKeys: TabKey[] = ['rfq', 'sample', 'sds', 'partner'];
  const [activeTab, setActiveTab] = useState<TabKey>(
    validKeys.includes(typeParam) ? typeParam : 'rfq'
  );

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);
  useEffect(() => {
    if (validKeys.includes(typeParam)) setActiveTab(typeParam);
  }, [typeParam]);

  const activeTabData = tabs.find(t => t.key === activeTab)!;

  return (
    <main id="main-content" className="bg-white">
      {/* Page header */}
      <div className="pt-20 pb-10 border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="section-label mb-2"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl lg:text-4xl font-bold text-[#0f1e35]"
          >
            Contact &amp; Enquiries
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[260px_1fr] gap-12">

          {/* Left — office info */}
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-sm font-semibold text-[#0f1e35] mb-5">Our Office</h2>
            <address className="not-italic flex flex-col gap-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-[#1558a7] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=25.2580424,55.3214658"
                  target="_blank" rel="noopener noreferrer"
                  className="group"
                >
                  <p className="text-sm text-[#374151] group-hover:text-[#1558a7] transition-colors">4D Street, Riggat Al Buteen</p>
                  <p className="text-sm text-[#374151] group-hover:text-[#1558a7] transition-colors">Dubai, United Arab Emirates</p>
                  <p className="text-xs text-[#1558a7] font-semibold mt-1">View on Google Maps →</p>
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-[#1558a7] flex-shrink-0" aria-hidden="true" />
                <a href="tel:+971561117261" className="text-sm text-[#374151] hover:text-[#1558a7] transition-colors">
                  +971 56 111 7261
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle size={15} className="text-[#25D366] flex-shrink-0" aria-hidden="true" />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[#374151] hover:text-[#1558a7] transition-colors"
                >
                  WhatsApp us
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-[#1558a7] flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@medist.ae" className="text-sm text-[#374151] hover:text-[#1558a7] transition-colors">
                  info@medist.ae
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={15} className="text-[#1558a7] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm text-[#374151]">Monday – Friday</p>
                  <p className="text-sm text-[#64748b]">8:00 AM – 5:00 PM (GST)</p>
                </div>
              </div>
            </address>

            {/* Quick-type nav on mobile/tablet */}
            <div className="lg:hidden">
              <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] mb-3">Enquiry Type</p>
              <div className="flex flex-wrap gap-2">
                {tabs.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                      activeTab === key
                        ? 'bg-[#1558a7] text-white border-[#1558a7]'
                        : 'text-[#374151] border-[#e2e8f0] hover:border-[#1558a7]/40'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — tabs + form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            {/* Tab bar */}
            <div className="hidden lg:flex items-center gap-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-1 mb-7">
              {tabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 flex-1 justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === key
                      ? 'bg-white text-[#0f1e35] shadow-sm border border-[#e2e8f0]'
                      : 'text-[#64748b] hover:text-[#374151]'
                  }`}
                  aria-selected={activeTab === key}
                >
                  <Icon size={15} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>

            {/* Form header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#0f1e35] mb-1">{activeTabData.title}</h2>
              <p className="text-sm text-[#64748b]">{activeTabData.subtitle}</p>
            </div>

            {/* Active form */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'rfq'     && <RFQForm />}
                {activeTab === 'sample'  && <SampleForm />}
                {activeTab === 'sds'     && <SDSForm />}
                {activeTab === 'partner' && <PartnerForm />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
