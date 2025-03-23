
// This file contains helper functions for Airwallex integration

// Define the necessary types for our local use
// Important: We're not importing from the SDK directly but defining compatible types
export type EntityType = 'COMPANY' | 'INDIVIDUAL';
export type TransferMethod = 'SWIFT' | 'LOCAL' | 'DOMESTIC';

/**
 * Get auth code for Airwallex API
 * In a real implementation, this would call your backend to retrieve a valid auth code
 */
export const getAuthCode = async (): Promise<string> => {
  // In a real implementation, this would be retrieved from your backend
  // This is just a placeholder
  console.log('Getting Airwallex auth code');
  return 'x4D7A7wOSQvoygpwqweZpG0GFHTcQfVPBTZoKV7EibgH';
};

/**
 * Get client ID for Airwallex API
 * In a real implementation, this would come from your environment variables or configuration
 */
export const getClientId = (): string => {
  // In a real implementation, this would come from environment variables
  // This is just a placeholder
  console.log('Getting Airwallex client ID');
  return 'BIjjMYsYTPuRqnkEloSvvf';
};

/**
 * Get environment for Airwallex API
 * Options are 'demo' or 'prod'
 */
export const getEnvironment = (): 'demo' | 'prod' => {
  // For development, use demo environment
  return 'demo';
};

/**
 * Generate a code verifier for Airwallex
 * This is a simple implementation for demo purposes that follows the documented structure
 */
export const getCodeVerifier = (): string => {
  return '~wh344Lea1FsCMVH39Fn9R2~nqq2uyD4wbvG9XCzWRxd0sZh9MFiF9gSVkM0C-ZvrdtjBFA6Cw1EvCpJcIjaeXg1-BXCfZd25ZmvuYZAqZtjJQA3NAa~7X1sgEfbMZJwQ';
};

/**
 * Initialize Airwallex with error handling
 * Returns a promise that resolves to true if initialization succeeds, false otherwise
 */
export const initializeAirwallex = async (): Promise<boolean> => {
  try {
    console.log('Initializing Airwallex SDK...');
    
    // Dynamically import the Airwallex SDK to ensure it's only loaded when needed
    const { init } = await import('@airwallex/components-sdk');
    
    // Initialize the Airwallex SDK with the exact format from documentation
    await init({
      locale: 'en',
      env: getEnvironment(),
      authCode: await getAuthCode(),
      clientId: getClientId(),
      codeVerifier: getCodeVerifier(),
    });
    
    console.log('Airwallex SDK initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize Airwallex SDK:', error);
    return false;
  }
};

/**
 * Create a beneficiary form configuration
 */
export const createBeneficiaryFormConfig = (currency: string, backgroundColor: string, accentColor: string) => {
  return {
    defaultValues: {
      beneficiary: {
        // Cast the string literal to any to avoid type conflicts with SDK's EntityType
        entity_type: 'COMPANY' as any,
        bank_details: {
          account_currency: currency || 'USD',
          bank_country_code: 'US',
          local_clearing_system: 'LOCAL',
        }
      },
      // Cast the array to any to avoid type conflicts with SDK's TransferMethod[]
      payment_methods: ['SWIFT'] as any,
    },
    theme: {
      palette: {
        primary: {
          '10': backgroundColor || '#143745', 
          '20': backgroundColor || '#143745',
          '30': backgroundColor || '#143745',
          '40': backgroundColor || '#143745',
          '50': backgroundColor || '#143745',
          '60': accentColor || '#d0e92a',
          '70': accentColor || '#d0e92a',
          '80': accentColor || '#d0e92a',
          '90': accentColor || '#d0e92a',
          '100': accentColor || '#d0e92a',
        },
        gradients: {
          primary: [backgroundColor || '#143745', accentColor || '#d0e92a'],
          secondary: [backgroundColor || '#143745', accentColor || '#d0e92a'],
          tertiary: [backgroundColor || '#143745', accentColor || '#d0e92a'],
          quaternary: [accentColor || '#d0e92a', accentColor || '#d0e92a'],
        },
      },
      components: {
        spinner: {
          colors: {
            start: {
              initial: backgroundColor || '#143745',
            },
            stop: {
              initial: accentColor || '#d0e92a',
            },
          },
        },
      },
    },
  };
};

/**
 * Create and mount Airwallex beneficiary form element
 * Returns a promise that resolves to the created element if successful, or null if it fails
 */
export const createAndMountBeneficiaryForm = async (
  containerId: string, 
  currency: string, 
  backgroundColor: string, 
  accentColor: string
) => {
  try {
    // First, initialize Airwallex
    const initialized = await initializeAirwallex();
    if (!initialized) {
      console.error('Failed to initialize Airwallex');
      return null;
    }

    // Create config
    const config = createBeneficiaryFormConfig(currency, backgroundColor, accentColor);
    console.log('Form config created:', config);
    
    // Import createElement
    const { createElement } = await import('@airwallex/components-sdk');
    
    // Create element
    console.log(`Creating beneficiary form...`);
    const element = await createElement('beneficiaryForm', config);
    console.log('Element created, now mounting to', `#${containerId}`);
    
    // Mount element directly
    element.mount(`#${containerId}`);
    console.log('Element mounted successfully');
    
    return element;
  } catch (error) {
    console.error('Error creating or mounting beneficiary form:', error);
    return null;
  }
};

/**
 * Setup event listeners for Airwallex element
 */
export const setupBeneficiaryFormEventListeners = (element: any) => {
  if (!element) {
    console.error('Cannot setup event listeners: Element is null');
    return;
  }

  // Ready event
  element.on('ready', (data: any) => {
    console.log('Beneficiary form ready:', data);
  });

  // Success event
  element.on('success', (data: any) => {
    console.log('Beneficiary form success:', data);
  });

  // Error event
  element.on('error', (data: any) => {
    console.error('Beneficiary form error:', data);
  });

  // Cancel event
  element.on('cancel', () => {
    console.log('Beneficiary form cancelled');
  });
};

/**
 * Handle form submission
 */
export const submitBeneficiaryForm = async (element: any) => {
  if (!element) {
    console.error('Cannot submit: Element is null');
    return { success: false, error: 'Form not initialized' };
  }

  try {
    const result = await element.submit();
    console.log('Form submitted successfully:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, error };
  }
};
