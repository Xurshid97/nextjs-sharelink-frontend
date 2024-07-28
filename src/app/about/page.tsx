const AboutUs = () => {
  return (
    <div style={styles.container}>
      <h1 style={{ ...styles.header, textAlign: 'center' }}>About Us</h1>
      <p style={styles.paragraph}>
        Welcome to <strong>ShareLink</strong>!
      </p>
      <p style={styles.paragraph}>
        At ShareLinc, we believe in making link organization and sharing as simple and efficient as possible. Whether you have a collection of valuable resources, interesting articles, or useful tools, ShareLinc provides the perfect platform to gather all your links in one place and share them effortlessly with anyone.
      </p>

      <h2 style={styles.subHeader}>Our Mission</h2>
      <p style={styles.paragraph}>
        Our mission is to streamline the way you collect and share links, eliminating the hassle of disorganized bookmarks and multiple sharing platforms. We aim to empower users with a seamless experience, allowing them to focus on the content they love and want to share.
      </p>

      <h2 style={styles.subHeader}>What We Offer</h2>
      <ul style={styles.list}>
        <li>Effortless Link Collection: Add as many links as you want to your collection. Whether it's for a personal project, professional resources, or simply a list of your favorite websites, ShareLinc has you covered.</li>
        <li>Rich Descriptions and Images: Enhance your links with descriptions and images to provide context and make your collections more engaging for your audience.</li>
        <li>No Registration Required: Start using ShareLinc immediately—no need to register first. We value your time and strive to provide instant access to our features.</li>
        <li>Easy Sharing: Share your link collections with anyone, whether it's for a collaborative project, a class assignment, or sharing your favorite finds with friends and family.</li>
      </ul>

      <h2 style={styles.subHeader}>Why Choose ShareLink?</h2>
      <p style={styles.paragraph}>
        ShareLinc is designed with user convenience in mind. We understand the importance of having a reliable tool to manage and share your links without unnecessary steps or complications. Our platform is intuitive, user-friendly, and accessible to everyone.
      </p>

      <h2 style={styles.subHeader}>Feedback and Support</h2>
      <p style={styles.paragraph}>
        We are continuously working to improve ShareLinc and would love to hear from you. Any valid feedback is appreciated as it helps us enhance our services and provide a better experience for our users.
      </p>

      <p style={styles.paragraph}>
        Thank you for choosing ShareLinc. We hope you enjoy using our platform as much as we enjoyed creating it for you.
      </p>

      <p style={styles.paragraph}>
        Feel free to reach out to us with any questions, suggestions, or feedback. Happy linking!
      </p>

      <p style={styles.paragraph}>
        Visit us at <a href="https://sharelinc.store/category" style={styles.link}>ShareLink</a> and start organizing and sharing your links today!
      </p>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    height: '70vh',
    overflowY: 'auto' as 'auto',
  },
  header: {
    fontSize: '2.5em',
    marginBottom: '20px',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: '2em',
    marginTop: '20px',
    marginBottom: '10px',
  },
  paragraph: {
    fontSize: '1.2em',
    marginBottom: '10px',
  },
  list: {
    fontSize: '1.2em',
    marginBottom: '10px',
    paddingLeft: '20px',
  },
  link: {
    color: '#0066cc',
    textDecoration: 'none',
  },
};

export default AboutUs;
