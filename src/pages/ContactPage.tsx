import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle, FileText, FlaskConical, BookOpen, Handshake, Printer } from 'lucide-react';
import CertificationsSection from '../components/CertificationsSection';

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
function useForm<T extends Record<string, string>>(initial: T, requiredKeys: (keyof T)[]) {
  const [values, setValues]   = useState<T>(initial);
  const [errors, setErrors]   = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [status, setStatus]   = useState<'idle' | 'submitting' | 'success'>('idle');

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
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setTouched(t => ({ ...t, [e.target.name]: true }));
    setErrors(validate(values));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = Object.keys(initial).reduce((a, k) => ({ ...a, [k]: true }), {}) as Record<keyof T, boolean>;
    setTouched(allTouched);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('submitting');
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
    setValues(initial);
    setTouched({});
  }

  return { values, errors, touched, status, handleChange, handleBlur, handleSubmit };
}

// ── RFQ Form ──────────────────────────────────────────────────────────────────
function RFQForm() {
  const initial = { fullName: '', company: '', country: '', email: '', phone: '', product: '', quantity: '', message: '' };
  const { values, errors, touched, status, handleChange, handleBlur, handleSubmit } = useForm(
    initial, ['fullName', 'company', 'email', 'product']
  );
  const p = (n: string) => ({ name: n, value: values[n as keyof typeof values], error: touched[n as keyof typeof values] ? errors[n as keyof typeof values] : undefined, onChange: handleChange as React.ChangeEventHandler<HTMLInputElement>, onBlur: handleBlur as React.FocusEventHandler<HTMLInputElement> });
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field {...p('fullName')}  label="Full Name"     placeholder="John Smith"            required />
        <Field {...p('company')}   label="Company Name"  placeholder="Acme Pharma LLC"        required />
        <Field {...p('country')}   label="Country"       placeholder="UAE" />
        <Field {...p('email')}     label="Email"         type="email" placeholder="john@company.com" required />
        <Field {...p('phone')}     label="Phone"         type="tel" placeholder="+971 50 000 0000" />
        <Field {...p('product')}   label="Product / Ingredient" placeholder="e.g. Xanthan Gum" required />
        <Field {...p('quantity')}  label="Estimated Quantity"   placeholder="e.g. 500 kg/month" />
      </div>
      <Textarea {...{ name: 'message', value: values.message, error: touched.message ? errors.message : undefined, onChange: handleChange as React.ChangeEventHandler<HTMLTextAreaElement>, onBlur: handleBlur as React.FocusEventHandler<HTMLTextAreaElement> }}
        label="Additional Requirements" placeholder="Purity, grade, certification requirements..." />
      <SubmitRow status={status} label="Send RFQ" />
    </form>
  );
}

// ── Sample Form ───────────────────────────────────────────────────────────────
function SampleForm() {
  const initial = { fullName: '', company: '', email: '', phone: '', product: '', quantity: '', address: '' };
  const { values, errors, touched, status, handleChange, handleBlur, handleSubmit } = useForm(
    initial, ['fullName', 'company', 'email', 'product']
  );
  const p = (n: string) => ({ name: n, value: values[n as keyof typeof values], error: touched[n as keyof typeof values] ? errors[n as keyof typeof values] : undefined, onChange: handleChange as React.ChangeEventHandler<HTMLInputElement>, onBlur: handleBlur as React.FocusEventHandler<HTMLInputElement> });
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field {...p('fullName')}  label="Full Name"        placeholder="John Smith"       required />
        <Field {...p('company')}   label="Company Name"     placeholder="Acme Pharma LLC"  required />
        <Field {...p('email')}     label="Email"            type="email" placeholder="john@company.com" required />
        <Field {...p('phone')}     label="Phone"            type="tel" placeholder="+971 50 000 0000" />
        <Field {...p('product')}   label="Product / Ingredient" placeholder="e.g. Carrageenan" required />
        <Field {...p('quantity')}  label="Sample Quantity"  placeholder="e.g. 100g / 500ml" />
      </div>
      <Textarea {...{ name: 'address', value: values.address, error: touched.address ? errors.address : undefined, onChange: handleChange as React.ChangeEventHandler<HTMLTextAreaElement>, onBlur: handleBlur as React.FocusEventHandler<HTMLTextAreaElement> }}
        label="Shipping Address" placeholder="Full delivery address including city, country, and postal code" rows={3} />
      <SubmitRow status={status} label="Request Sample" />
    </form>
  );
}

// ── SDS/TDS Form ──────────────────────────────────────────────────────────────
function SDSForm() {
  const initial = { fullName: '', company: '', email: '', product: '', docType: '', notes: '' };
  const { values, errors, touched, status, handleChange, handleBlur, handleSubmit } = useForm(
    initial, ['fullName', 'email', 'product', 'docType']
  );
  const p = (n: string) => ({ name: n, value: values[n as keyof typeof values], error: touched[n as keyof typeof values] ? errors[n as keyof typeof values] : undefined, onChange: handleChange as React.ChangeEventHandler<HTMLInputElement>, onBlur: handleBlur as React.FocusEventHandler<HTMLInputElement> });
  const selCls = `w-full px-3 py-2.5 text-sm border rounded-md bg-white text-[#1e293b] focus:outline-none focus:ring-2 transition ${touched.docType && errors.docType ? 'border-red-400 focus:ring-red-200' : 'border-[#e2e8f0] focus:ring-[#1558a7]/25 focus:border-[#1558a7]'}`;
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field {...p('fullName')}  label="Full Name"   placeholder="John Smith"          required />
        <Field {...p('company')}   label="Company"     placeholder="Acme Pharma LLC" />
        <Field {...p('email')}     label="Email"       type="email" placeholder="john@company.com" required />
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
      <SubmitRow status={status} label="Request Documents" />
    </form>
  );
}

// ── Partner Form ──────────────────────────────────────────────────────────────
function PartnerForm() {
  const initial = { company: '', contactName: '', email: '', phone: '', region: '', companyType: '', message: '' };
  const { values, errors, touched, status, handleChange, handleBlur, handleSubmit } = useForm(
    initial, ['company', 'contactName', 'email']
  );
  const p = (n: string) => ({ name: n, value: values[n as keyof typeof values], error: touched[n as keyof typeof values] ? errors[n as keyof typeof values] : undefined, onChange: handleChange as React.ChangeEventHandler<HTMLInputElement>, onBlur: handleBlur as React.FocusEventHandler<HTMLInputElement> });
  const selCls = `w-full px-3 py-2.5 text-sm border rounded-md bg-white text-[#1e293b] focus:outline-none focus:ring-2 transition border-[#e2e8f0] focus:ring-[#1558a7]/25 focus:border-[#1558a7]`;
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field {...p('company')}     label="Company Name"    placeholder="Your Company"   required />
        <Field {...p('contactName')} label="Contact Name"    placeholder="John Smith"     required />
        <Field {...p('email')}       label="Email"           type="email" placeholder="john@company.com" required />
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
      <SubmitRow status={status} label="Submit Partnership Enquiry" />
    </form>
  );
}

// ── Submit row ────────────────────────────────────────────────────────────────
function SubmitRow({ status, label }: { status: 'idle' | 'submitting' | 'success'; label: string }) {
  return (
    <div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary px-8 py-3 text-sm disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : label}
      </button>
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
            role="status" aria-live="polite"
          >
            <CheckCircle size={17} className="text-green-600 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm text-green-800 font-medium">
              Sent! We'll respond within one business day.
            </p>
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
                <div>
                  <p className="text-sm text-[#374151]">Business Bay, Dubai</p>
                  <p className="text-sm text-[#374151]">United Arab Emirates</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-[#1558a7] flex-shrink-0" aria-hidden="true" />
                <a href="tel:+97147017500" className="text-sm text-[#374151] hover:text-[#1558a7] transition-colors">
                  +971 4 701 7500
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Printer size={15} className="text-[#1558a7] flex-shrink-0" aria-hidden="true" />
                <span className="text-sm text-[#374151]">Fax: +971 4 701 7501</span>
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
                  <p className="text-sm text-[#374151]">Sunday – Thursday</p>
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

      <CertificationsSection />
    </main>
  );
}
