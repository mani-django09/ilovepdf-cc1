import React from "react"
import { ArrowLeft, Heart, Users, Globe, Zap, Star, Target, Award, Coffee, Code, Shield, Lightbulb } from "lucide-react"

function AboutUs() {
  const teamValues = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "User-Centric Design",
      description: "Every feature we build starts with understanding what our users need.",
      color: "bg-red-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy First",
      description: "Your documents are your business. We never store, access, or share your files.",
      color: "bg-green-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Time is valuable. Our tools are optimized for speed and efficiency.",
      color: "bg-blue-500"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Accessible Everywhere",
      description: "No downloads, no installations. Our tools work on any device, anywhere.",
      color: "bg-purple-500"
    }
  ]

  const milestones = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Started with a simple idea: make PDF tools accessible to everyone, for free.",
      icon: <Lightbulb className="h-6 w-6" />
    },
    {
      year: "2021",
      title: "First Million Users",
      description: "Reached our first million users with just 5 core PDF tools.",
      icon: <Users className="h-6 w-6" />
    },
    {
      year: "2022",
      title: "Mobile Optimization",
      description: "Launched fully responsive design for seamless mobile experience.",
      icon: <Code className="h-6 w-6" />
    },
    {
      year: "2023",
      title: "Advanced Features",
      description: "Introduced PDF editing, watermarking, and advanced conversion options.",
      icon: <Star className="h-6 w-6" />
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Now serving 10M+ users in 170+ countries with 15+ PDF tools.",
      icon: <Globe className="h-6 w-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <title>About Us - ilovepdf.cc | Free PDF Tools for Everyone</title>
      <meta name="description" content="Learn about ilovepdf.cc's mission to provide free, fast, and secure PDF tools for everyone. Trusted by 10M+ users worldwide since 2020." />
      <meta name="keywords" content="about ilovepdf.cc, pdf tools company, free pdf software, online document processing" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://ilovepdf.cc/about" />

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <a 
              href="/" 
              className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </a>
            <div className="ml-4 flex items-center">
              <span className="text-xl font-bold text-gray-900">iLove</span>
              <span className="text-xl font-bold text-red-500">PDF</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-50 to-pink-50 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500 text-white rounded-full mb-8">
              <Heart className="h-10 w-10" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About ilovepdf.cc
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're on a mission to make PDF processing simple, fast, and accessible to everyone. 
              Since 2020, we've been serving millions of users worldwide with free, secure, and powerful PDF tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold text-red-500 mb-1">10M+</div>
                <div className="text-gray-600">Happy Users</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold text-red-500 mb-1">500M+</div>
                <div className="text-gray-600">Files Processed</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold text-red-500 mb-1">170+</div>
                <div className="text-gray-600">Countries Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  At ilovepdf.cc, we believe that powerful PDF tools shouldn't come with a price tag or complicated software installations. 
                  Our mission is to democratize document processing by providing professional-grade PDF tools that are:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-600"><strong>100% Free:</strong> No hidden costs, no premium tiers for basic features</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-600"><strong>Privacy-Focused:</strong> Your documents are automatically deleted after processing</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-600"><strong>Universally Accessible:</strong> Works on any device with an internet connection</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-600"><strong>Lightning Fast:</strong> Optimized for speed without compromising quality</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl p-8 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                    <p className="text-gray-700">
                      To become the world's most trusted and user-friendly PDF processing platform, 
                      empowering individuals and businesses to work more efficiently with their documents.
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-200 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-200 rounded-full opacity-20 transform -translate-x-12 translate-y-12"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Drives Us
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our core values guide every decision we make and every feature we build at ilovepdf.cc.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamValues.map((value, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${value.color} text-white rounded-lg mb-4`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story/Timeline Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From a simple idea to serving millions of users worldwide - here's how ilovepdf.cc evolved.
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-200 h-full hidden lg:block"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center mr-3">
                            {milestone.icon}
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-red-500">{milestone.year}</div>
                            <h3 className="text-xl font-semibold text-gray-900">{milestone.title}</h3>
                          </div>
                        </div>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="hidden lg:block w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                    
                    <div className="w-full lg:w-5/12"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose ilovepdf.cc?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We're not just another PDF tool provider. Here's what makes us different.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast Processing</h3>
                <p className="text-gray-600 text-sm">
                  Our optimized servers process most files in under 3 seconds. No waiting around - get your results instantly.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Bank-Level Security</h3>
                <p className="text-gray-600 text-sm">
                  SSL encryption, automatic file deletion, and zero data retention. Your privacy is our priority.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Universal Compatibility</h3>
                <p className="text-gray-600 text-sm">
                  Works on any device, any browser, any operating system. No downloads or installations required.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="w-12 h-12 bg-red-500 text-white rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Made with Love</h3>
                <p className="text-gray-600 text-sm">
                  Every feature is crafted with care, tested thoroughly, and optimized for the best user experience.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Award-Winning Quality</h3>
                <p className="text-gray-600 text-sm">
                  Recognized by industry experts and loved by millions of users for our quality and reliability.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="w-12 h-12 bg-teal-500 text-white rounded-lg flex items-center justify-center mb-4">
                  <Coffee className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Always Improving</h3>
                <p className="text-gray-600 text-sm">
                  We continuously add new features and improve existing ones based on user feedback and needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The Team Behind ilovepdf.cc
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We're a passionate team of developers, designers, and PDF enthusiasts working 
                remotely from around the world to make document processing easier for everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  <Code className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Development Team</h3>
                <p className="text-gray-600 text-sm">
                  Expert developers who build fast, reliable, and secure PDF processing tools using cutting-edge technology.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  <Target className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Design Team</h3>
                <p className="text-gray-600 text-sm">
                  UX/UI specialists focused on creating intuitive, accessible, and beautiful user experiences for all devices.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  <Users className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Support Team</h3>
                <p className="text-gray-600 text-sm">
                  Dedicated support specialists who ensure every user has a smooth experience with our PDF tools.
                </p>
              </div>
            </div>
            
            <div className="mt-12 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to Join Our Team?</h3>
              <p className="text-gray-600 mb-6">
                We're always looking for talented individuals who share our passion for creating amazing user experiences.
              </p>
              <a 
                href="mailto:careers@ilovepdf.cc" 
                className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View Open Positions
                <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
              </a>
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Commitment to You
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                These aren't just promises - they're the foundation of everything we do at ilovepdf.cc.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Always Free Core Tools</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Our essential PDF tools will always remain free. We believe everyone deserves access to 
                  quality document processing tools, regardless of their budget.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Merge, split, and compress PDFs
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Convert between PDF and other formats
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Basic editing and annotation tools
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center mr-4">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Universal Accessibility</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  No matter where you are or what device you're using, ilovepdf.cc works. 
                  We're committed to providing consistent experiences across all platforms.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Works on desktop, tablet, and mobile
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    No software installation required
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Compatible with all modern browsers
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center mr-4">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Continuous Innovation</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We never stop improving. Our team constantly works on new features, performance 
                  optimizations, and user experience enhancements based on your feedback.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Regular feature updates and improvements
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    User feedback drives our development
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Latest technology for better performance
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-500 text-white rounded-lg flex items-center justify-center mr-4">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">User-First Approach</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Every decision we make is guided by one question: "How does this benefit our users?" 
                  Your needs come first, always.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Simple, intuitive interface design
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    No unnecessary complexity or clutter
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Fast, reliable performance every time
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ilovepdf.cc by the Numbers
              </h2>
              <p className="text-lg text-gray-600">
                Here's what we've accomplished together since our launch.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-500 mb-2">10M+</div>
                <div className="text-gray-600 font-medium">Monthly Users</div>
                <div className="text-sm text-gray-500 mt-1">And growing daily</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-500 mb-2">500M+</div>
                <div className="text-gray-600 font-medium">Files Processed</div>
                <div className="text-sm text-gray-500 mt-1">Since our launch</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">99.9%</div>
                <div className="text-gray-600 font-medium">Uptime</div>
                <div className="text-sm text-gray-500 mt-1">Reliable service</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-500 mb-2">170+</div>
                <div className="text-gray-600 font-medium">Countries</div>
                <div className="text-sm text-gray-500 mt-1">Worldwide reach</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">15+</div>
                <div className="text-gray-600 font-medium">PDF Tools</div>
                <div className="text-sm text-gray-500 mt-1">Always expanding</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-500 mb-2">&lt;3s</div>
                <div className="text-gray-600 font-medium">Avg Processing</div>
                <div className="text-sm text-gray-500 mt-1">Lightning fast</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-500 mb-2">24/7</div>
                <div className="text-gray-600 font-medium">Availability</div>
                <div className="text-sm text-gray-500 mt-1">Always online</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-500 mb-2">0</div>
                <div className="text-gray-600 font-medium">Data Breaches</div>
                <div className="text-sm text-gray-500 mt-1">100% secure</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/CTA Section */}
        <section className="py-16 bg-gradient-to-br from-red-500 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Join millions of users who trust ilovepdf.cc for their daily PDF processing needs. 
              It's free, fast, and secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="/"
                className="bg-white text-red-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg inline-flex items-center justify-center"
              >
                Try Our PDF Tools
                <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-colors text-lg inline-flex items-center justify-center"
              >
                Get in Touch
                <Heart className="ml-2 h-5 w-5" />
              </a>
            </div>
            <p className="text-red-100 text-sm">
              Have questions or feedback? We'd love to hear from you at hello@ilovepdf.cc
            </p>
          </div>
        </section>

        {/* Footer Navigation */}
        <section className="bg-white py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <a 
                href="/" 
                className="text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                ← Back to ilovepdf.cc
              </a>
              <div className="flex gap-4 text-sm">
                <a 
                  href="/terms" 
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  Terms of Service
                </a>
                <a 
                  href="/privacy" 
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  Privacy Policy
                </a>
                <a 
                  href="/contact" 
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AboutUs