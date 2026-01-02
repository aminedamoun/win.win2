import { Router, Route } from './utils/router';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import TrackingScripts from './components/TrackingScripts';
import SEO from './components/SEO';
import ChatWidget from './components/ChatWidget';
import PageLoader from './components/PageLoader';
import Home from './pages/Home';
import About from './pages/About';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Apply from './pages/Apply';
import Insights from './pages/Insights';
import InsightDetail from './pages/InsightDetail';

function App() {
  return (
    <>
      <PageLoader />
      <Router>
      <TrackingScripts />
      <CookieConsent />
      <Header />

      <main>
        <Route path="/">
          <SEO
            title="Win Win - Build Your Sales Career in Slovenia"
            description="Join Win Win, a performance-driven sales company specializing in B2C field sales, call center sales, and telecommunications solutions across Slovenia."
          />
          <Home />
        </Route>

        <Route path="/about">
          <SEO
            title="About Us - Win Win Sales Company"
            description="Learn about Win Win's mission, values, and company culture. We're building the most effective and respected sales team in Slovenia."
          />
          <About />
        </Route>

        <Route path="/jobs">
          <SEO
            title="Career Opportunities - Win Win"
            description="Explore sales career opportunities at Win Win. Competitive compensation, comprehensive training, and clear career progression."
          />
          <Jobs />
        </Route>

        <Route path="/jobs/:id">
          <SEO
            title="Job Details - Win Win"
            description="View detailed information about this position including responsibilities, compensation, and requirements."
          />
          <JobDetail />
        </Route>

        <Route path="/insights">
          <SEO
            title="Insights - Win Win Sales Company"
            description="Sales strategies, team culture, career growth insights, and real stories from the Win Win team. Expert knowledge from Slovenia's leading sales organization."
          />
          <Insights />
        </Route>

        <Route path="/insights/:slug">
          <SEO
            title="Article - Win Win Insights"
            description="Read expert insights and strategies from Win Win's sales team."
          />
          <InsightDetail />
        </Route>

        <Route path="/apply">
          <SEO
            title="Apply Now - Join Win Win"
            description="Submit your application to join Win Win. Start your career in sales with comprehensive training and competitive compensation."
          />
          <Apply />
        </Route>

        <Route path="/privacy">
          <SEO title="Privacy Policy - Win Win" />
          <div className="min-h-screen bg-black pt-20 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="glass-card p-8 text-gray-300 space-y-4">
                  <p>Privacy policy content placeholder. Add your company's privacy policy here.</p>
                </div>
              </div>
            </div>
          </div>
        </Route>

        <Route path="/cookies">
          <SEO title="Cookie Policy - Win Win" />
          <div className="min-h-screen bg-black pt-20 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
                <div className="glass-card p-8 text-gray-300 space-y-4">
                  <p>Cookie policy content placeholder. Add your company's cookie policy here.</p>
                </div>
              </div>
            </div>
          </div>
        </Route>

        <Route path="/terms">
          <SEO title="Terms of Service - Win Win" />
          <div className="min-h-screen bg-black pt-20 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="glass-card p-8 text-gray-300 space-y-4">
                  <p>Terms of service content placeholder. Add your company's terms of service here.</p>
                </div>
              </div>
            </div>
          </div>
        </Route>
      </main>

      <Footer />
      <ChatWidget />
      </Router>
    </>
  );
}

export default App;
