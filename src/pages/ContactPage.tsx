import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { industries } from '../data/industries';
import CertificationsSection from '../components/CertificationsSection';

interface FormValues {
  fullName: string; company: string; country: string;
  email: string; phone: string; inquiryType: string; message: string;
}
interface FormErrors { [key: string]: string | undefined }

const empty: FormValues = { fullName: '', company: '', country: '', email: '', phone: '', inquiryType: '', message: '' };

function validate(v: FormValues): FormErrors {
  const e: FormErrors = {};
  if (!v.fullName.trim())  e.fullName  = 'Required';
  if (!v.company.trim())   e.company   = 'Required';
  if (!v.country.trim())   e.country   = 'Required';
  if (!v.email.trim())     e.email     = 'Required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Invalid email';
  if (!v.phone.trim())     e.phone     = 'Required';
  if (!v.inquiryType)      e.inquiryType = 'Please select';
  if (!v.message.trim())   e.message   = 'Required';
  return e;
}

export default function ContactPage() {
  const [values, setValues]   = useState<FormValues>(empty);
  const [errors, setErrors]   = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus]   = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors(validate(next));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setTouched(t => ({ ...t, [e.target.name]: true }));
    setErrors(validate(values));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = Object.keys(empty).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('submitting');
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
    setValues(empty);
    setTouched({});
  }

  const inputClass = (name: string) =>
    `w-full px-3 py-2.5 text-sm border rounded-md bg-white text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 transition ${
      touched[name] && errors[name]
        ? 'border-red-400 focus:ring-red-200'
        : 'border-[#e2e8f0] focus:ring-[#1d5fa8]/25 focus:border-[#1d5fa8]'
    }`;

  return (
    <main id="main-content" className="bg-white">
      {/* Page header */}
      <div className="pt-20 pb-12 border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl lg:text-4xl font-bold text-[#0f1e35] mb-2"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#64748b] text-base"
          >
            Get in touch with our team for product inquiries, sample requests, or partnering opportunities.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-[300px_1fr] gap-12">

          {/* Left — office info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-base font-semibold text-[#0f1e35] mb-6">Our Office</h2>
            <address className="not-italic flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#1d5fa8] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm text-[#374151]">Business Bay, Dubai</p>
                  <p className="text-sm text-[#374151]">United Arab Emirates</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#1d5fa8] flex-shrink-0" aria-hidden="true" />
                <a href="tel:+971000000000" className="text-sm text-[#374151] hover:text-[#1d5fa8] transition-colors">
                  +971 0 000 0000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#1d5fa8] flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@medist.ae" className="text-sm text-[#374151] hover:text-[#1d5fa8] transition-colors">
                  info@medist.ae
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-[#1d5fa8] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm text-[#374151]">Sunday – Thursday</p>
                  <p className="text-sm text-[#64748b]">8:00 AM – 5:00 PM (GST)</p>
                </div>
              </div>
            </address>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <Field label="Full Name *"     name="fullName"  type="text"  value={values.fullName}  error={touched.fullName  ? errors.fullName  : undefined} className={inputClass('fullName')}  onChange={handleChange} onBlur={handleBlur} placeholder="John Smith" />
                <Field label="Company Name"    name="company"   type="text"  value={values.company}   error={touched.company   ? errors.company   : undefined} className={inputClass('company')}   onChange={handleChange} onBlur={handleBlur} placeholder="Acme Pharma LLC" />
                <Field label="Country *"       name="country"   type="text"  value={values.country}   error={touched.country   ? errors.country   : undefined} className={inputClass('country')}   onChange={handleChange} onBlur={handleBlur} placeholder="UAE" />
                <Field label="Email *"         name="email"     type="email" value={values.email}     error={touched.email     ? errors.email     : undefined} className={inputClass('email')}     onChange={handleChange} onBlur={handleBlur} placeholder="john@company.com" />
                <Field label="Phone"           name="phone"     type="tel"   value={values.phone}     error={touched.phone     ? errors.phone     : undefined} className={inputClass('phone')}     onChange={handleChange} onBlur={handleBlur} placeholder="+971 50 000 0000" />

                {/* Inquiry Type */}
                <div>
                  <label htmlFor="inquiryType" className="block text-xs font-semibold text-[#374151] mb-1.5">
                    Inquiry Type *
                  </label>
                  <select
                    id="inquiryType" name="inquiryType"
                    value={values.inquiryType}
                    onChange={handleChange} onBlur={handleBlur}
                    className={inputClass('inquiryType')}
                    aria-invalid={touched.inquiryType && !!errors.inquiryType}
                  >
                    <option value="">Select...</option>
                    {industries.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                    <option value="general">General Enquiry</option>
                    <option value="partnership">Partnership</option>
                  </select>
                  {touched.inquiryType && errors.inquiryType && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={11} aria-hidden="true" />{errors.inquiryType}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-xs font-semibold text-[#374151] mb-1.5">Message *</label>
                <textarea
                  id="message" name="message" rows={5}
                  value={values.message}
                  onChange={handleChange} onBlur={handleBlur}
                  placeholder="Tell us about your requirements..."
                  className={inputClass('message') + ' resize-none'}
                  aria-invalid={touched.message && !!errors.message}
                />
                {touched.message && errors.message && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={11} aria-hidden="true" />{errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary px-8 py-3 text-sm disabled:opacity-60"
              >
                {status === 'submitting' ? 'Sending…' : 'Submit Inquiry'}
              </button>
            </form>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-5 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
                  role="status" aria-live="polite"
                >
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" aria-hidden="true" />
                  <p className="text-sm text-green-800 font-medium">
                    Your inquiry has been sent. We'll respond within one business day.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <CertificationsSection />
    </main>
  );
}

function Field({ label, name, type, value, error, className, onChange, onBlur, placeholder }: {
  label: string; name: string; type: string; value: string; error?: string;
  className: string; placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold text-[#374151] mb-1.5">{label}</label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} onBlur={onBlur}
        placeholder={placeholder} className={className} aria-invalid={!!error} />
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={11} aria-hidden="true" />{error}
        </p>
      )}
    </div>
  );
}
