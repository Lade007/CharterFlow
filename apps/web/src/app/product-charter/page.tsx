'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { TextReveal } from '@/components/ui/text-reveal';
import { Badge } from '@/components/ui/badge';

interface CharterSection {
  id: string;
  title: string;
  description: string;
  type: 'problem' | 'solution' | 'market' | 'features' | 'metrics' | 'roadmap';
}

interface CharterData {
  problem: string;
  solution: string;
  targetMarket: string;
  keyFeatures: string[];
  successMetrics: string[];
  timeline: string[];
}

export default function ProductCharterPage() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [charterData, setCharterData] = useState<CharterData>({
    problem: '',
    solution: '',
    targetMarket: '',
    keyFeatures: [],
    successMetrics: [],
    timeline: []
  });
  const [newFeature, setNewFeature] = useState('');
  const [newMetric, setNewMetric] = useState('');
  const [newTimeline, setNewTimeline] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const sections: CharterSection[] = [
    {
      id: 'problem',
      title: 'Problem Statement',
      description: 'Define the core problem you\'re solving and why it matters.',
      type: 'problem'
    },
    {
      id: 'solution',
      title: 'Solution Framework',
      description: 'Outline your unique solution approach and methodology.',
      type: 'solution'
    },
    {
      id: 'market',
      title: 'Target Market',
      description: 'Identify your ideal customer segments and market size.',
      type: 'market'
    },
    {
      id: 'features',
      title: 'Key Features',
      description: 'List the core features that deliver value to customers.',
      type: 'features'
    },
    {
      id: 'metrics',
      title: 'Success Metrics',
      description: 'Define how you\'ll measure product success and impact.',
      type: 'metrics'
    },
    {
      id: 'roadmap',
      title: 'Development Roadmap',
      description: 'Plan your product development timeline and milestones.',
      type: 'roadmap'
    }
  ];

  const addFeature = () => {
    if (newFeature.trim()) {
      setCharterData({
        ...charterData,
        keyFeatures: [...charterData.keyFeatures, newFeature]
      });
      setNewFeature('');
    }
  };

  const addMetric = () => {
    if (newMetric.trim()) {
      setCharterData({
        ...charterData,
        successMetrics: [...charterData.successMetrics, newMetric]
      });
      setNewMetric('');
    }
  };

  const addTimeline = () => {
    if (newTimeline.trim()) {
      setCharterData({
        ...charterData,
        timeline: [...charterData.timeline, newTimeline]
      });
      setNewTimeline('');
    }
  };

  const removeFeature = (index: number) => {
    setCharterData({
      ...charterData,
      keyFeatures: charterData.keyFeatures.filter((_, i) => i !== index)
    });
  };

  const removeMetric = (index: number) => {
    setCharterData({
      ...charterData,
      successMetrics: charterData.successMetrics.filter((_, i) => i !== index)
    });
  };

  const removeTimeline = (index: number) => {
    setCharterData({
      ...charterData,
      timeline: charterData.timeline.filter((_, i) => i !== index)
    });
  };

  const generateCharter = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation with enhanced content
    setTimeout(() => {
      const enhancedCharter = {
        problem: charterData.problem || 
          'Small businesses struggle to transform their expertise into scalable digital products that generate recurring revenue.',
        solution: charterData.solution ||
          'AI-powered platform that automates the productization process, from knowledge capture to market-ready digital products.',
        targetMarket: charterData.targetMarket ||
          'Consultants, coaches, and subject matter experts with specialized knowledge but limited technical resources.',
        keyFeatures: charterData.keyFeatures.length > 0 ? charterData.keyFeatures : [
          'Automated knowledge extraction from documents',
          'AI-powered product framework generation',
          'Market validation tools',
          'Revenue optimization recommendations'
        ],
        successMetrics: charterData.successMetrics.length > 0 ? charterData.successMetrics : [
          'Time to market: < 30 days',
          'Customer acquisition cost: <$50',
          'Product completion rate: >80%',
          'Monthly recurring revenue: >$1000'
        ],
        timeline: charterData.timeline.length > 0 ? charterData.timeline : [
          'Week 1-2: MVP development',
          'Week 3-4: Beta testing',
          'Week 5-6: Market launch',
          'Week 7-8: Scale and optimize'
        ]
      };

      setCharterData(enhancedCharter);
      setIsGenerating(false);
    }, 2000);
  };

  const exportCharter = () => {
    const charterContent = `
# Product Charter

## Problem Statement
${charterData.problem}

## Solution Framework
${charterData.solution}

## Target Market
${charterData.targetMarket}

## Key Features
${charterData.keyFeatures.map((feature, index) => `${index + 1}. ${feature}`).join('\n')}

## Success Metrics
${charterData.successMetrics.map((metric, index) => `${index + 1}. ${metric}`).join('\n')}

## Development Roadmap
${charterData.timeline.map((item, index) => `${index + 1}. ${item}`).join('\n')}

---
Generated by CharterFlow - Transform knowledge into products
    `.trim();

    const blob = new Blob([charterContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-charter.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderSectionContent = () => {
    switch (sections[currentSection].type) {
      case 'problem':
        return (
          <div className="space-y-6">
            <textarea
              value={charterData.problem}
              onChange={(e) => setCharterData({ ...charterData, problem: e.target.value })}
              placeholder="Describe the core problem you're solving. What pain points exist? What's the current state of the market?"
              className="w-full h-32 px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              title="Problem statement"
              aria-label="Problem statement description"
            />
          </div>
        );

      case 'solution':
        return (
          <div className="space-y-6">
            <textarea
              value={charterData.solution}
              onChange={(e) => setCharterData({ ...charterData, solution: e.target.value })}
              placeholder="Outline your unique solution. How does your approach differ from existing solutions? What's your methodology?"
              className="w-full h-32 px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              title="Solution framework"
              aria-label="Solution framework description"
            />
          </div>
        );

      case 'market':
        return (
          <div className="space-y-6">
            <textarea
              value={charterData.targetMarket}
              onChange={(e) => setCharterData({ ...charterData, targetMarket: e.target.value })}
              placeholder="Define your target market. Who are your ideal customers? What's the market size and characteristics?"
              className="w-full h-32 px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              title="Target market"
              aria-label="Target market description"
            />
          </div>
        );

      case 'features':
        return (
          <div className="space-y-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                placeholder="Add a key feature (e.g., 'AI-powered recommendations', 'Real-time collaboration')"
                className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                title="New feature input"
                aria-label="Add new feature"
              />
              <Button onClick={addFeature} variant="primary">
                Add Feature
              </Button>
            </div>
            
            <div className="space-y-3">
              {charterData.keyFeatures.map((feature, index) => (
                <GlassCard key={index} className="p-4">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-neutral-900">{feature}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFeature(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        );

      case 'metrics':
        return (
          <div className="space-y-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={newMetric}
                onChange={(e) => setNewMetric(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addMetric()}
                placeholder="Add a success metric (e.g., 'User engagement rate', 'Revenue per user')"
                className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                title="New metric input"
                aria-label="Add new success metric"
              />
              <Button onClick={addMetric} variant="primary">
                Add Metric
              </Button>
            </div>
            
            <div className="space-y-3">
              {charterData.successMetrics.map((metric, index) => (
                <GlassCard key={index} className="p-4">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-neutral-900">{metric}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeMetric(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        );

      case 'roadmap':
        return (
          <div className="space-y-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={newTimeline}
                onChange={(e) => setNewTimeline(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTimeline()}
                placeholder="Add a timeline milestone (e.g., 'Week 1-2: MVP development')"
                className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                title="New timeline milestone"
                aria-label="Add new timeline milestone"
              />
              <Button onClick={addTimeline} variant="primary">
                Add Milestone
              </Button>
            </div>
            
            <div className="space-y-3">
              {charterData.timeline.map((item, index) => (
                <GlassCard key={index} className="p-4">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-neutral-900">{item}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeTimeline(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (sections[currentSection].type) {
      case 'problem':
        return charterData.problem.length > 50;
      case 'solution':
        return charterData.solution.length > 50;
      case 'market':
        return charterData.targetMarket.length > 50;
      case 'features':
        return charterData.keyFeatures.length >= 3;
      case 'metrics':
        return charterData.successMetrics.length >= 3;
      case 'roadmap':
        return charterData.timeline.length >= 3;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <TextReveal delay={200}>
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Product Charter Generator
            </h1>
            <p className="text-lg text-neutral-600">
              Transform your UVZ insights into actionable product frameworks
            </p>
          </div>
        </TextReveal>

        {/* Section Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {sections.map((section, index) => (
            <Button
              key={section.id}
              variant={currentSection === index ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setCurrentSection(index)}
              className="text-sm"
            >
              {section.title}
            </Button>
          ))}
        </div>

        {/* Current Section */}
        <TextReveal delay={400}>
          <GlassCard className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                {sections[currentSection].title}
              </h2>
              <p className="text-neutral-600">
                {sections[currentSection].description}
              </p>
            </div>

            {renderSectionContent()}

            {/* AI Generation & Export */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-neutral-200">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={generateCharter}
                  disabled={isGenerating}
                  className="flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent animate-spin rounded-full"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      🤖 AI Enhance
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={exportCharter}
                  disabled={!charterData.problem && !charterData.solution}
                >
                  📄 Export Charter
                </Button>
              </div>
              
              <div className="text-sm text-neutral-500">
                {canProceed() && '✅ Section complete'}
              </div>
            </div>
          </GlassCard>
        </TextReveal>

        {/* Charter Preview */}
        {(charterData.problem || charterData.solution) && (
          <TextReveal delay={600}>
            <GlassCard className="mt-8 p-8 bg-gradient-to-r from-primary-50 to-secondary-50">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">
                Charter Preview
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {charterData.problem && (
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">Problem</h4>
                    <p className="text-sm text-neutral-600 bg-white p-4 rounded-lg">
                      {charterData.problem}
                    </p>
                  </div>
                )}
                
                {charterData.solution && (
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">Solution</h4>
                    <p className="text-sm text-neutral-600 bg-white p-4 rounded-lg">
                      {charterData.solution}
                    </p>
                  </div>
                )}
                
                {charterData.targetMarket && (
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">Target Market</h4>
                    <p className="text-sm text-neutral-600 bg-white p-4 rounded-lg">
                      {charterData.targetMarket}
                    </p>
                  </div>
                )}
                
                {charterData.keyFeatures.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">Key Features</h4>
                    <ul className="text-sm text-neutral-600 bg-white p-4 rounded-lg space-y-1">
                      {charterData.keyFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Badge variant="primary" className="text-xs">
                            {index + 1}
                          </Badge>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {(charterData.successMetrics.length > 0 || charterData.timeline.length > 0) && (
                <div className="md:col-span-2 space-y-4">
                  {charterData.successMetrics.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-2">Success Metrics</h4>
                      <ul className="text-sm text-neutral-600 bg-white p-4 rounded-lg space-y-1">
                        {charterData.successMetrics.map((metric, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Badge variant="success" className="text-xs">
                              ✓
                            </Badge>
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {charterData.timeline.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-2">Development Roadmap</h4>
                      <ul className="text-sm text-neutral-600 bg-white p-4 rounded-lg space-y-1">
                        {charterData.timeline.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {index + 1}
                            </Badge>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
            </GlassCard>
          </TextReveal>
        )}
      </div>
    </div>
  );
}
