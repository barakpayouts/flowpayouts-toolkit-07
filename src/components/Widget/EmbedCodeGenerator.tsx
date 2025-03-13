
import React, { useState } from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { Copy, Check, Code2, ExternalLink, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EmbedCodeGeneratorProps {
  widgetKey: number;
}

const EmbedCodeGenerator: React.FC<EmbedCodeGeneratorProps> = ({ widgetKey }) => {
  const { config } = useWidgetConfig();
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedReact, setCopiedReact] = useState(false);
  const [activeTab, setActiveTab] = useState('script');

  // Configuration stringified for embedding
  const configString = JSON.stringify({
    recipientType: config.recipientType,
    steps: config.steps,
    payoutMethods: config.payoutMethods,
    showProgressBar: config.showProgressBar,
    showStepNumbers: config.showStepNumbers,
    primaryColor: config.primaryColor,
    accentColor: config.accentColor,
    backgroundColor: config.backgroundColor,
    textColor: config.textColor,
    borderColor: config.borderColor,
    borderRadius: config.borderRadius,
    buttonStyle: config.buttonStyle,
    payoutAmount: config.payoutAmount,
    companyName: config.companyName,
    currency: config.currency
  }, null, 2);

  // Generate script tag embed code
  const scriptCode = `<div id="payout-widget"></div>
<script src="https://cdn.payoutswidget.com/widget.js"></script>
<script>
  PayoutWidget.init({
    targetElementId: 'payout-widget',
    config: ${configString.replace(/\n/g, '\n    ')}
  });
</script>`;

  // Generate React component embed code
  const reactCode = `import { PayoutWidget } from '@payoutswidget/react';

const YourComponent = () => {
  const widgetConfig = ${configString.replace(/\n/g, '\n  ')};

  return (
    <div className="your-container">
      <PayoutWidget config={widgetConfig} />
    </div>
  );
};

export default YourComponent;`;

  const copyToClipboard = (text: string, type: 'script' | 'react') => {
    navigator.clipboard.writeText(text);
    if (type === 'script') {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    } else {
      setCopiedReact(true);
      setTimeout(() => setCopiedReact(false), 2000);
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
          <Code2 className="inline-block mr-2 mb-1" size={20} />
          Embed Code Generator
        </h3>
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs"
          onClick={() => window.open('https://docs.payoutswidget.com/integration', '_blank')}
        >
          <ExternalLink size={14} className="mr-1" />
          Documentation
        </Button>
      </div>
      
      <p className="text-white/70 mb-4">
        Use this code to embed the widget with your current configuration into your website or application.
      </p>
      
      <Tabs 
        defaultValue={activeTab} 
        onValueChange={(value) => setActiveTab(value)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 mb-4 bg-white/10">
          <TabsTrigger value="script" className="data-[state=active]:bg-white/20">
            Script Tag
          </TabsTrigger>
          <TabsTrigger value="react" className="data-[state=active]:bg-white/20">
            React Component
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="script" className="space-y-4 animate-fade-in">
          <div className="relative">
            <pre className="bg-white/5 p-4 rounded-lg border border-white/10 text-white/90 text-sm overflow-x-auto">
              <code>{scriptCode}</code>
            </pre>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(scriptCode, 'script')}
              className="absolute top-2 right-2 text-white bg-black/40 hover:bg-black/60"
            >
              {copiedScript ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </div>
          <div className="text-sm text-white/60">
            <p className="mb-2"><strong>Instructions:</strong></p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Add the <code className="bg-white/10 px-1 rounded">div</code> with ID "payout-widget" where you want the widget to appear.</li>
              <li>Include the widget.js script from our CDN.</li>
              <li>Initialize the widget with your configuration.</li>
            </ol>
          </div>
        </TabsContent>
        
        <TabsContent value="react" className="space-y-4 animate-fade-in">
          <div className="relative">
            <pre className="bg-white/5 p-4 rounded-lg border border-white/10 text-white/90 text-sm overflow-x-auto">
              <code>{reactCode}</code>
            </pre>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(reactCode, 'react')}
              className="absolute top-2 right-2 text-white bg-black/40 hover:bg-black/60"
            >
              {copiedReact ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </div>
          <div className="text-sm text-white/60">
            <p className="mb-2"><strong>Instructions:</strong></p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Install our React package: <code className="bg-white/10 px-1 rounded">npm install @payoutswidget/react</code></li>
              <li>Import the PayoutWidget component.</li>
              <li>Pass your configuration as props.</li>
              <li>Style the container as needed for your application.</li>
            </ol>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 bg-payouts-accent/10 p-4 rounded-lg border border-payouts-accent/30">
        <h4 className="text-payouts-accent font-medium mb-2 flex items-center">
          <Lock size={16} className="mr-2" />
          Security Note
        </h4>
        <p className="text-white/80 text-sm">
          Always use appropriate authentication and authorization in your production environment before
          initializing the widget. For more security best practices, refer to our documentation.
        </p>
      </div>
    </div>
  );
};

export default EmbedCodeGenerator;
