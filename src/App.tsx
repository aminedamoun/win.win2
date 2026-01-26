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
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import TermsOfUse from './pages/TermsOfUse';

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
            <PrivacyPolicy />
          </Route>

          <Route path="/cookies">
            <CookiePolicy />
          </Route>

          <Route path="/terms">
            <TermsOfUse />
          </Route>
        </main>

        <Footer />
        <ChatWidget />
        </Router>
      </>
    );
}

export default App;
