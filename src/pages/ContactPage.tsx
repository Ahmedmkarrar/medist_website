import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { industries } from '../data/industries';

interface FormValues {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  company?: string;
  email?: string;
  phone?: string;
  industry?: string;
  message?: string;
}

const empty: FormValues = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  industry: '',
  message: '',
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!values.company.trim()) errors.company = 'Company name is required.';
  if (!values.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.phone.trim()) errors.phone = 'Phone number is required.';
  if (!values.industry) errors.industry = 'Please select an industry.';
  if (!values.message.trim()) errors.message = 'Message is required.';
  else if (values.message.trim().length < 20) errors.message = 'Please provide a little more detail (min 20 characters).';
  return errors;
}

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormValues]) {
      setErrors(validate({ ...values, [name]: value }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(validate(values));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = Object.keys(empty).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as Record<keyof FormValues, boolean>
    );
    setTouched(allTouched);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('submitting');
    // Simulate async submit
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
    setValues(empty);
    setTouched({});
  }

  return (
    <main id="main-content" className="min-h-screen bg-[#F7F9FC]">
      {/* Page header */}
      <div className="bg-[#071228] pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Let's Talk Ingredients
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#8A9BB0] text-lg max-w-xl"
          >
            Whether you're looking for a specific ingredient or need formulation support,
            our team is ready to help.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
          >
            <h2 className="text-2xl font-bold text-[#0D1F3C] mb-4">Get in Touch</h2>
            <p className="text-[#8A9BB0] text-base leading-relaxed mb-10">
              Reach out to our ingredient specialists for product enquiries, samples,
              pricing, or technical support. We typically respond within one business day.
            </p>

            <address className="not-italic flex flex-col gap-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#0A8C7A]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-[#0A8C7A]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-[#0D1F3C] text-sm mb-0.5">Address</p>
                  <p className="text-[#8A9BB0] text-sm leading-relaxed">Medist HQ, Dubai, UAE</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#0A8C7A]/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-[#0A8C7A]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-[#0D1F3C] text-sm mb-0.5">Phone</p>
                  <a href="tel:+971000000000" className="text-[#8A9BB0] text-sm hover:text-[#0A8C7A] transition-colors">
                    +971 00 000 0000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#0A8C7A]/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-[#0A8C7A]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-[#0D1F3C] text-sm mb-0.5">Email</p>
                  <a href="mailto:info@medist.com" className="text-[#8A9BB0] text-sm hover:text-[#0A8C7A] transition-colors">
                    info@medist.com
                  </a>
                </div>
              </div>
            </address>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 h-56 bg-gray-100 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0A8C7A]/15 flex items-center justify-center">
                <MapPin size={20} className="text-[#0A8C7A]" aria-hidden="true" />
              </div>
              <p className="text-[#8A9BB0] text-sm">Map coming soon</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A8C7A] text-sm font-semibold hover:underline"
              >
                View on Google Maps →
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm"
          >
            <h2 className="text-xl font-bold text-[#0D1F3C] mb-6">Send an Enquiry</h2>

            <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <Field
                  label="Full Name"
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Ahmed Al-Hassan"
                  value={values.fullName}
                  error={touched.fullName ? errors.fullName : undefined}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Field
                  label="Company Name"
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Acme Foods LLC"
                  value={values.company}
                  error={touched.company ? errors.company : undefined}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Field
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ahmed@company.com"
                  value={values.email}
                  error={touched.email ? errors.email : undefined}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Field
                  label="Phone Number"
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+971 50 123 4567"
                  value={values.phone}
                  error={touched.phone ? errors.phone : undefined}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {/* Industry dropdown */}
              <div className="mb-5">
                <label htmlFor="industry" className="block text-sm font-semibold text-[#0D1F3C] mb-1.5">
                  Industry <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={values.industry}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  aria-invalid={touched.industry && !!errors.industry}
                  aria-describedby={touched.industry && errors.industry ? 'industry-error' : undefined}
                  className={`w-full px-4 py-3 rounded-xl border text-sm bg-white text-[#0D1F3C] focus:outline-none focus:ring-2 transition appearance-none ${
                    touched.industry && errors.industry
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-200 focus:ring-[#0A8C7A]/40 focus:border-[#0A8C7A]'
                  }`}
                >
                  <option value="">Select your industry</option>
                  {industries.map((ind) => (
                    <option key={ind.id} value={ind.id}>
                      {ind.name}
                    </option>
                  ))}
                </select>
                {touched.industry && errors.industry && (
                  <p id="industry-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} aria-hidden="true" /> {errors.industry}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold text-[#0D1F3C] mb-1.5">
                  Message <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your ingredient requirements, quantities, or any questions..."
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  aria-invalid={touched.message && !!errors.message}
                  aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0D1F3C] placeholder:text-[#8A9BB0] focus:outline-none focus:ring-2 transition resize-none ${
                    touched.message && errors.message
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-200 focus:ring-[#0A8C7A]/40 focus:border-[#0A8C7A]'
                  }`}
                />
                {touched.message && errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} aria-hidden="true" /> {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 bg-[#0A8C7A] hover:bg-[#076E5F] disabled:opacity-60 text-white font-semibold rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
              </button>
            </form>

            {/* Toast notifications */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="mt-5 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0" aria-hidden="true" />
                  <p className="text-green-800 text-sm font-medium">
                    Your enquiry has been sent! We'll be in touch within one business day.
                  </p>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="mt-5 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
                  role="alert"
                  aria-live="assertive"
                >
                  <AlertCircle size={20} className="text-red-500 flex-shrink-0" aria-hidden="true" />
                  <p className="text-red-700 text-sm font-medium">
                    Something went wrong. Please try again or email us directly at info@medist.com
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

interface FieldProps {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function Field({ label, id, name, type, placeholder, value, error, onChange, onBlur }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-[#0D1F3C] mb-1.5">
        {label} <span className="text-red-500" aria-hidden="true">*</span>
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
        aria-required="true"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0D1F3C] placeholder:text-[#8A9BB0] focus:outline-none focus:ring-2 transition ${
          error
            ? 'border-red-400 focus:ring-red-300'
            : 'border-gray-200 focus:ring-[#0A8C7A]/40 focus:border-[#0A8C7A]'
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={12} aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}
