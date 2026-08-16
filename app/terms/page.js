import styles from './page.module.css';

export const metadata = {
  title: 'Terms of Service — ACM Cal State LA',
};

export default function TermsPage() {
  return (
    <main>
      <div className="Content flex flex-col" style={{ paddingTop: '3rem' }}>
        <div className={styles.intro}>
          <h1 className={styles.heading}>Terms of Service</h1>
          <p className={styles.updated}>Last updated: March 2026</p>
        </div>

        <div className={styles.body}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the ACM Cal State LA website, you agree to be bound by these
              Terms of Service. If you do not agree, please do not use this site.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Use of the Site</h2>
            <p>
              This website is provided for informational purposes about ACM Cal State LA, its
              events, committees, and programs. You agree to use it only for lawful purposes and
              in a way that does not infringe the rights of others.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Intellectual Property</h2>
            <p>
              All content on this site — including text, images, logos, and graphics — is owned
              by ACM Cal State LA or its respective contributors and is protected by applicable
              intellectual property laws. You may not reproduce or redistribute content without
              prior written permission, except as permitted by open-source licenses where
              applicable.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Third-Party Links</h2>
            <p>
              This site may contain links to external websites. ACM Cal State LA is not
              responsible for the content or privacy practices of those sites.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Disclaimer of Warranties</h2>
            <p>
              This site is provided &quot;as is&quot; without warranties of any kind. ACM Cal
              State LA makes no guarantees about the accuracy, completeness, or availability of
              the content.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Limitation of Liability</h2>
            <p>
              ACM Cal State LA shall not be liable for any damages arising from your use of or
              inability to use this website.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service at any time. Continued use of the site after
              changes constitutes your acceptance of the revised terms.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Contact</h2>
            <p>
              Questions about these terms can be directed to{' '}
              <a href="mailto:acm.calstatela@gmail.com" className={styles.link}>
                acm.calstatela@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
