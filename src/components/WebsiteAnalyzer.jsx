import React, { useState } from 'react';
import { Search, Loader, ArrowRight, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Metric explanations
const metricInfo = {
  performance: {
    title: "Performance Score",
    description: "Overall performance of your website. Considers loading speed, interactivity, and visual stability.",
    good: "90-100: Excellent, 70-89: Good",
    bad: "Below 70 needs improvement. Poor performance can lead to higher bounce rates."
  },
  seo: {
    title: "SEO Score",
    description: "Search Engine Optimization score indicates how well your site can be discovered through search.",
    good: "90-100: Excellent, 70-89: Good",
    bad: "Below 70 may affect your search rankings."
  },
  accessibility: {
    title: "Accessibility Score",
    description: "Measures how accessible your website is to all users, including those with disabilities.",
    good: "90-100: Excellent, 70-89: Good",
    bad: "Below 70 indicates potential barriers for some users."
  },
  bestPractices: {
    title: "Best Practices",
    description: "Adherence to web development best practices and security standards.",
    good: "90-100: Excellent, 70-89: Good",
    bad: "Below 70 suggests security or code quality issues."
  },
  firstContentfulPaint: {
    title: "First Contentful Paint",
    description: "Time until the first text or image is painted on screen.",
    good: "Under 2s is good",
    bad: "Over 3s needs improvement"
  },
  speedIndex: {
    title: "Speed Index",
    description: "How quickly content is visually displayed during page load.",
    good: "Under 3.4s is good",
    bad: "Over 5.8s needs improvement"
  },
  largestContentfulPaint: {
    title: "Largest Contentful Paint",
    description: "Time until the largest content element is visible.",
    good: "Under 2.5s is good",
    bad: "Over 4s needs improvement"
  },
  timeToInteractive: {
    title: "Time to Interactive",
    description: "Time until the page becomes fully interactive.",
    good: "Under 3.8s is good",
    bad: "Over 7.3s needs improvement"
  }
};

// Tooltip Component
const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 w-72 p-4 bg-gray-800 text-white rounded-lg shadow-lg -top-2 left-full ml-2">
          <div className="text-lg font-semibold mb-2">{content.title}</div>
          <div className="text-sm text-gray-300 mb-2">{content.description}</div>
          <div className="text-sm text-green-400">✓ {content.good}</div>
          <div className="text-sm text-red-400">✗ {content.bad}</div>
        </div>
      )}
    </div>
  );
};

// Score Card Component
const ScoreCard = ({ title, score, metric }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="p-6 rounded-lg bg-gray-900 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-300">{title}</span>
          <Tooltip content={metricInfo[metric]}>
            <HelpCircle size={16} className="text-gray-500 hover:text-gray-300" />
          </Tooltip>
        </div>
      </div>
      <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
        {score}%
      </div>
      <div className={`text-sm ${getScoreColor(score)}`}>
        {getScoreLabel(score)}
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, score, metric }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="p-6 rounded-lg bg-gray-900 border border-gray-800">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-gray-300 font-medium">{title}</h4>
        <Tooltip content={metricInfo[metric]}>
          <HelpCircle size={16} className="text-gray-500 hover:text-gray-300" />
        </Tooltip>
      </div>
      <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
        {value}
      </div>
      <div className={`text-sm ${getScoreColor(score)}`}>
        Score: {score}%
      </div>
    </div>
  );
};

// Checklist Item Component
const ChecklistItem = ({ label, passed, description }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50">
    {passed ? (
      <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
    ) : (
      <XCircle className="text-red-400 flex-shrink-0" size={20} />
    )}
    <div>
      <span className="text-gray-300">{label}</span>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

// Main Component
const WebsiteAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const validateUrl = (inputUrl) => {
    try {
      const urlObj = new URL(inputUrl);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const analyzeSite = async (e) => {
    e.preventDefault();
    
    if (!validateUrl(url)) {
      toast.error('Please enter a valid URL (including http:// or https://)', {
        style: {
          background: '#1F2937',
          color: '#FFF',
          border: '1px solid #374151'
        }
      });
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Analyzing website...', {
      style: {
        background: '#1F2937',
        color: '#FFF',
        border: '1px solid #374151'
      }
    });

    try {
      const apiKey = 'AIzaSyAgdPerVQCk7YdT5QqVNdwhGgGxVrWJxbo';
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=mobile&category=performance&category=seo&category=best-practices&category=accessibility`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || 'Failed to analyze website');
      }

      if (!data.lighthouseResult?.categories || !data.lighthouseResult?.audits) {
        throw new Error('Incomplete data received from API');
      }

      const { categories, audits } = data.lighthouseResult;

      const metrics = {
        performance: Math.round((categories.performance?.score || 0) * 100),
        seo: Math.round((categories.seo?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
        firstContentfulPaint: audits['first-contentful-paint'] ? {
          value: audits['first-contentful-paint'].displayValue,
          score: Math.round(audits['first-contentful-paint'].score * 100)
        } : null,
        speedIndex: audits['speed-index'] ? {
          value: audits['speed-index'].displayValue,
          score: Math.round(audits['speed-index'].score * 100)
        } : null,
        largestContentfulPaint: audits['largest-contentful-paint'] ? {
          value: audits['largest-contentful-paint'].displayValue,
          score: Math.round(audits['largest-contentful-paint'].score * 100)
        } : null,
        timeToInteractive: audits['interactive'] ? {
          value: audits['interactive'].displayValue,
          score: Math.round(audits['interactive'].score * 100)
        } : null,
        seoDetails: {
          meta: audits['meta-description']?.score === 1,
          crawlable: audits['is-crawlable']?.score === 1,
          robots: audits['robots-txt']?.score === 1
        },
        bestPracticesDetails: {
          https: audits['is-on-https']?.score === 1,
          javascript: audits['no-vulnerable-libraries']?.score === 1
        }
      };

      setResults(metrics);
      toast.success('Analysis completed successfully!', {
        style: {
          background: '#1F2937',
          color: '#FFF',
          border: '1px solid #374151'
        }
      });
    } catch (err) {
      toast.error(err.message || 'An error occurred during analysis', {
        style: {
          background: '#1F2937',
          color: '#FFF',
          border: '1px solid #374151'
        }
      });
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <Toaster position="top-right" />

      <form onSubmit={analyzeSite} className="space-y-4">
        <div className="relative flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your website URL"
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !url}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={16} />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Search size={16} />
                <span>Analyze your Site</span>
              </>
            )}
          </button>
        </div>
      </form>

      {results && (
        <div className="space-y-8 mt-8">
          {/* Core Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ScoreCard title="Performance" score={results.performance} metric="performance" />
            <ScoreCard title="SEO" score={results.seo} metric="seo" />
            <ScoreCard title="Accessibility" score={results.accessibility} metric="accessibility" />
            <ScoreCard title="Best Practices" score={results.bestPractices} metric="bestPractices" />
          </div>

          {/* Performance Metrics */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.firstContentfulPaint && (
                <MetricCard
                  title="First Contentful Paint"
                  value={results.firstContentfulPaint.value}
                  score={results.firstContentfulPaint.score}
                  metric="firstContentfulPaint"
                />
              )}
              {results.speedIndex && (
                <MetricCard
                  title="Speed Index"
                  value={results.speedIndex.value}
                  score={results.speedIndex.score}
                  metric="speedIndex"
                />
              )}
              {results.largestContentfulPaint && (
                <MetricCard
                  title="Largest Contentful Paint"
                  value={results.largestContentfulPaint.value}
                  score={results.largestContentfulPaint.score}
                  metric="largestContentfulPaint"
                />
              )}
              {results.timeToInteractive && (
                <MetricCard
                  title="Time to Interactive"
                  value={results.timeToInteractive.value}
                  score={results.timeToInteractive.score}
                  metric="timeToInteractive"
                />
              )}
            </div>
          </div>

          {/* Checklists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">SEO Checklist</h3>
              <div className="space-y-2">
                <ChecklistItem
                  label="Meta Description"
                  passed={results.seoDetails.meta}
                  description="Proper meta description helps search engines understand your page"
                />
                <ChecklistItem
                  label="Crawlable"
                  passed={results.seoDetails.crawlable}
                  description="Site can be discovered by search engines"
                />
                <ChecklistItem
                  label="Valid Robots.txt"
                  passed={results.seoDetails.robots}
                  description="Robots.txt properly configured for search engine crawling"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Best Practices</h3>
              <div className="space-y-2">
                <ChecklistItem
                  label="HTTPS Enabled"
                  passed={results.bestPracticesDetails.https}
                  description="Secure connection protects user data"
                />
                <ChecklistItem
                  label="Safe JavaScript"
                  passed={results.bestPracticesDetails.javascript}
                  description="No known vulnerable JavaScript libraries detected"
                />
              </div>
              </div>
          </div>
        </div>
      )}
    </div>
  )}

export default WebsiteAnalyzer;