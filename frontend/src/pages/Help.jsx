import { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { submitInquiry } from "../firebase";  // Import the new Firestore function
import Footer from "../components/Footer";
import './Help.css';

const Help = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleFaq = (index) => {
    console.log('Toggling FAQ index:', index);
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await submitInquiry(
        formData.name,
        formData.email,
        formData.subject,
        formData.message
      );
  
      if (response.success) {
        // alert("Message sent successfully!");
        setFormSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Failed to send message: " + response.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  


  const faqs = [
    {
      question: 'How do I get started with AgroVison services?',
      answer: 'Getting started is easy! Simply schedule a consultation through our website or contact our customer service team. Our agricultural experts will assess your specific needs and recommend the best solutions for your farm.'
    },
    {
      question: 'What size farms do you work with?',
      answer: 'We work with farms of all sizes, from small family operations to large commercial enterprises. Our solutions are scalable and can be customized to meet the specific needs of your farm, regardless of its size.'
    },
    {
      question: 'How accurate is your weather forecasting?',
      answer: 'Our agricultural weather forecasting is highly accurate, with a success rate of over 90% for 3-day forecasts. We use a combination of multiple weather models, satellite data, and local weather stations to provide hyperlocal predictions specifically for your farm location.'
    },
    {
      question: 'Can your soil analysis system work with any soil type?',
      answer: 'Yes, our soil analysis system is designed to work with all soil types. Our comprehensive testing analyzes various parameters including nutrient levels, pH, organic matter, and soil structure to provide customized recommendations for your specific soil conditions.'
    },
    {
      question: 'How often should I conduct soil tests?',
      answer: 'For optimal results, we recommend conducting comprehensive soil tests at least twice a year - once before planting and once after harvest. However, the frequency may vary depending on your specific crops, soil conditions, and farming practices. Our experts can help you determine the ideal testing schedule for your farm.'
    },
    {
      question: 'Do I need special equipment to use your services?',
      answer: 'Some of our services require specific equipment, such as soil sensors or weather stations, which we can provide as part of your service package. Other services, like our farm management software, only require a computer or mobile device with internet access. During your consultation, we\'ll discuss what equipment is needed for your chosen services.'
    },
    {
      question: 'How quickly will I see results from recommendations?',
      answer: 'The timeline for seeing results varies depending on the specific service and your farming situation. Some benefits, like improved decision-making from weather forecasts, are immediate. Others, such as soil health improvements, may take a growing season or more to fully realize. Our team will provide you with realistic expectations during your consultation.'
    },
    {
      question: 'What kind of support do you offer after implementation?',
      answer: 'We provide ongoing support for all our services, including regular check-ins, troubleshooting assistance, and continuous optimization of your solutions. Our customer success team is available via phone, email, or chat to address any questions or concerns you may have.'
    }
  ];

  return (
    <main>
      {/* Hero Section with unique class */}
      <section className="hero help-hero">
        <div className="container">
          <h1 className="hero-title">Help & Support</h1>
          <p className="hero-subtitle">
            Find answers to common questions and get in touch with our support team
          </p>
        </div>
      </section>

      {/* Rest of the sections remain unchanged */}
      <section>
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find answers to the most common questions about our services
          </p>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div 
                  className="faq-question" 
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  {activeIndex === index ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {activeIndex === index && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Have a question that's not answered above? Send us a message and we'll get back to you.
          </p>
          <div className="contact-form">
            {formSubmitted ? (
              <div className="form-success">
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-control"
                    placeholder="What is your message about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    placeholder="Type your message here..."
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section support-options">
        <div className="container">
          <h2 className="section-title">Other Ways to Reach Us</h2>
          <p className="section-subtitle">
            We're here to help through multiple channels
          </p>
          <div className="grid">
            <div className="card">
              <div className="card-body">
                <div className="card-icon"></div>
                <h3 className="card-title">Phone Support</h3>
                <p className="card-text">
                  Call our customer service team for immediate assistance with your questions.
                </p>
                <p className="card-contact">+1 (234) 567-8901</p>
                <p className="card-availability">
                  Available Monday-Friday, 8am-6pm EST
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="card-icon"></div>
                <h3 className="card-title">Email Support</h3>
                <p className="card-text">
                  Send us an email and our team will respond within 24 hours.
                </p>
                <p className="card-contact">support@agritech.com</p>
                <p className="card-availability">
                  We respond to all emails within one business day
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Help;