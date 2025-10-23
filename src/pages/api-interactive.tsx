import React, { useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './api-interactive.module.css';

export default function InteractiveAPI(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Load the static HTML content into an iframe
    if (iframeRef.current) {
      iframeRef.current.src = '/api-interactive.html';
    }
  }, []);

  return (
    <Layout
      title="Interactive API"
      description="Interactive API documentation for Clearshore services">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Interactive API Documentation</h1>
          <p className={styles.description}>
            Explore and test the Clearshore API endpoints directly from your browser
          </p>
        </div>
        
        <div className={styles.content}>
          <iframe
            ref={iframeRef}
            className={styles.iframe}
            title="Interactive API Documentation"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      </div>
    </Layout>
  );
}
