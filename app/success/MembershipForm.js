'use client';

import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './page.module.css';

const SCHOOL_YEARS = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate Student', 'Other'];

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  schoolEmail: '',
  cin: '',
  schoolYear: '',
  membershipStatus: '',
  phone: '',
  birthday: '',
  major: '',
  minor: '',
  howHeard: '',
};

export default function MembershipForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'member_signups'), {
        ...form,
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
          <div className={styles.formRow}>
            <Field label="First name" name="firstName" value={form.firstName} onChange={handleChange} required />
            <Field label="Last name" name="lastName" value={form.lastName} onChange={handleChange} required />
          </div>

          <div className={styles.formRow}>
            <Field label="School email" name="schoolEmail" type="email" value={form.schoolEmail} onChange={handleChange} required />
            <Field label="CIN" name="cin" value={form.cin} onChange={handleChange} required />
          </div>

          <div className={styles.formRow}>
            <SelectField
              label="School year"
              name="schoolYear"
              value={form.schoolYear}
              onChange={handleChange}
              options={SCHOOL_YEARS}
              required
            />
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Membership</span>
              <div className={styles.radioRow}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="membershipStatus"
                    value="New"
                    checked={form.membershipStatus === 'New'}
                    onChange={handleChange}
                    required
                  />
                  New member
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="membershipStatus"
                    value="Returning"
                    checked={form.membershipStatus === 'Returning'}
                    onChange={handleChange}
                  />
                  Returning member
                </label>
              </div>
            </div>
          </div>

          <div className={styles.formRow}>
            <Field label="Phone number" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
            <Field label="Birthday" name="birthday" type="date" value={form.birthday} onChange={handleChange} required />
          </div>

          <div className={styles.formRow}>
            <Field label="Major" name="major" value={form.major} onChange={handleChange} required />
            <Field label="Minor (if applicable)" name="minor" value={form.minor} onChange={handleChange} />
          </div>

          <Field
            label="How'd you hear about us?"
            name="howHeard"
            value={form.howHeard}
            onChange={handleChange}
          />

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

function Field({ label, name, type = 'text', value, onChange, required }) {
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
      />
    </label>
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
