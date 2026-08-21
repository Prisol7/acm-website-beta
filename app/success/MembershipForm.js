'use client';

import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './page.module.css';

const CLASS_STANDINGS = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate Student', 'Other'];
const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say', 'Other'];
const HEAR_ABOUT_OPTIONS = [
  'Instagram',
  'Discord',
  'Friend / Classmate',
  'Professor / Class announcement',
  'Tabling / Event on campus',
  'General meeting',
  'Other',
];
const CAREER_EXPECTATION_OPTIONS = [
  { value: 'career-guide', label: 'Career guidance' },
  { value: 'networking-opportunity', label: 'Networking opportunities' },
  { value: 'leadership-dev', label: 'Leadership development' },
  { value: 'project-experience', label: 'Project experience' },
  { value: 'internship-opportunity', label: 'Internship opportunities' },
  { value: 'scholarship-opportunity', label: 'Scholarship opportunities' },
  { value: 'mentorship', label: 'Mentorship' },
];

const EMPTY_FORM = {
  email: '',
  membership: '',
  firstName: '',
  lastName: '',
  cin: '',
  phone: '',
  discordId: '',
  birthday: '',
  gender: '',
  major: '',
  classStanding: '',
  seniorDesign: '',
  expectedGraduation: '',
  howHeard: '',
  howHeardOther: '',
  careerExpectation: [],
  projectRecommendations: '',
};

export default function MembershipForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCareerExpectation = (value) => {
    setForm((prev) => ({
      ...prev,
      careerExpectation: prev.careerExpectation.includes(value)
        ? prev.careerExpectation.filter((v) => v !== value)
        : [...prev.careerExpectation, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const howHeard = form.howHeard === 'Other' && form.howHeardOther
        ? form.howHeardOther
        : form.howHeard;

      const { howHeardOther, ...rest } = form;

      await addDoc(collection(db, 'member_signups'), {
        ...rest,
        howHeard,
        createdAt: serverTimestamp(),
      });
      setForm(EMPTY_FORM);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.formSection}>
        <div className={styles.formCard}>
          <p className={styles.formSuccess}>
            🎉 Thanks! Your membership info has been submitted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formSection}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Complete your membership profile</h2>
        <p className={styles.formSubtitle}>
          Tell us a bit more about yourself so we can keep your membership on file.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>

          {/* ── Contact info ── */}
          <FormSection title="Contact info">
            <div className={styles.formRow}>
              <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
              <Field label="Phone number" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
            </div>
            <div className={styles.formRow}>
              <Field label="Discord ID" name="discordId" value={form.discordId} onChange={handleChange} placeholder="username" />
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Membership</span>
                <div className={styles.radioRow}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="membership"
                      value="New"
                      checked={form.membership === 'New'}
                      onChange={handleChange}
                      required
                    />
                    New member
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="membership"
                      value="Returning"
                      checked={form.membership === 'Returning'}
                      onChange={handleChange}
                    />
                    Returning member
                  </label>
                </div>
              </div>
            </div>
          </FormSection>

          {/* ── About you ── */}
          <FormSection title="About you">
            <div className={styles.formRow}>
              <Field label="First name" name="firstName" value={form.firstName} onChange={handleChange} required />
              <Field label="Last name" name="lastName" value={form.lastName} onChange={handleChange} required />
            </div>
            <div className={styles.formRow}>
              <Field label="Birthday" name="birthday" type="date" value={form.birthday} onChange={handleChange} required />
              <SelectField label="Gender" name="gender" value={form.gender} onChange={handleChange} options={GENDERS} />
            </div>
            <Field label="CIN" name="cin" value={form.cin} onChange={handleChange} placeholder="N/A if none" required />
          </FormSection>

          {/* ── Academics ── */}
          <FormSection title="Academics">
            <div className={styles.formRow}>
              <Field label="Major" name="major" value={form.major} onChange={handleChange} required />
              <SelectField
                label="Class standing"
                name="classStanding"
                value={form.classStanding}
                onChange={handleChange}
                options={CLASS_STANDINGS}
                required
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Senior design?</span>
                <div className={styles.radioRow}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="seniorDesign"
                      value="Yes"
                      checked={form.seniorDesign === 'Yes'}
                      onChange={handleChange}
                      required
                    />
                    Yes
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="seniorDesign"
                      value="No"
                      checked={form.seniorDesign === 'No'}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
              </div>
              <Field
                label="Expected graduation date"
                name="expectedGraduation"
                type="month"
                value={form.expectedGraduation}
                onChange={handleChange}
                required
              />
            </div>
          </FormSection>

          {/* ── Tell us more ── */}
          <FormSection title="Tell us more">
            <div className={styles.formRow}>
              <SelectField
                label="How did you hear about ACM?"
                name="howHeard"
                value={form.howHeard}
                onChange={handleChange}
                options={HEAR_ABOUT_OPTIONS}
              />
              {form.howHeard === 'Other' && (
                <Field
                  label="Tell us where"
                  name="howHeardOther"
                  value={form.howHeardOther}
                  onChange={handleChange}
                />
              )}
            </div>
            <CheckboxGroupField
              label="What are you hoping to get out of ACM? (select all that apply)"
              options={CAREER_EXPECTATION_OPTIONS}
              selected={form.careerExpectation}
              onToggle={toggleCareerExpectation}
            />
            <TextAreaField
              label="Any project ideas or recommendations you'd like to see us cover?"
              name="projectRecommendations"
              value={form.projectRecommendations}
              onChange={handleChange}
            />
          </FormSection>

          {status === 'error' && (
            <p className={styles.formError}>
              Something went wrong submitting your info. Please try again.
            </p>
          )}

          <button type="submit" className={styles.formSubmit} disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Submitting…' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

function FormSection({ title, children }) {
  return (
    <fieldset className={styles.formFieldset}>
      <legend className={styles.formSectionTitle}>{title}</legend>
      <div className={styles.formSectionBody}>{children}</div>
    </fieldset>
  );
}

function Field({ label, name, type = 'text', value, onChange, required, placeholder }) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <input
        className={styles.fieldInput}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </label>
  );
}

function TextAreaField({ label, name, value, onChange, required }) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <textarea
        className={styles.fieldTextarea}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={3}
      />
    </label>
  );
}

function CheckboxGroupField({ label, options, selected, onToggle }) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <div className={styles.checkboxGrid}>
        {options.map(({ value, label: optionLabel }) => (
          <label key={value} className={styles.radioLabel}>
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => onToggle(value)}
            />
            {optionLabel}
          </label>
        ))}
      </div>
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required }) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <select
        className={styles.fieldInput}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="" disabled>Select one</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}
