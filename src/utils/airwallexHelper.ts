// This file contains helper functions for Airwallex integration

// Define custom types since they're not exported from the SDK
export type EntityType = 'COMPANY' | 'INDIVIDUAL';

export interface BeneficiaryFormOptions {
  defaultValues: {
    beneficiary: {
      entity_type: EntityType;
      bank_details: {
        account_currency: string;
        bank_country_code: string;
        local_clearing_system: string;
      }
    };
    payment_methods: string[];
  };
  theme?: {
    palette?: {
      primary?: Record<string, string>;
      gradients?: Record<string, string[]>;
    };
    components?: {
      spinner?: {
        colors?: {
          start?: {
            initial?: string;
          };
          stop?: {
            initial?: string;
          };
        };
      };
    };
  };
}

/**
 * Get auth code for Airwallex API
 * In a real implementation, this would call your backend to retrieve a valid auth code
 */
export const getAuthCode = async (): Promise<string> => {
  // In a real implementation, this would be retrieved from your backend
  // This is just a placeholder
  console.log('Getting Airwallex auth code');
  return 'mock-auth-code-for-development';
};

/**
 * Get client ID for Airwallex API
 * In a real implementation, this would come from your environment variables or configuration
 */
export const getClientId = (): string => {
  // In a real implementation, this would come from environment variables
  // This is just a placeholder
  console.log('Getting Airwallex client ID');
  return 'mock-client-id-for-development';
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
 * Process form submission result
 * This is a helper function to handle the submission result from the Airwallex form
 */
export const handleFormSubmission = (result: any) => {
  console.log('Airwallex form submission result:', result);
  return result;
};

/**
 * Generate a code verifier for Airwallex
 * This is a simple implementation for demo purposes
 */
export const getCodeVerifier = (): string => {
  // A fixed code verifier for development
  return 'airwallex-code-verifier-123456789';
};

/**
 * Initialize Airwallex with error handling
 * Returns a promise that resolves to true if initialization succeeds, false otherwise
 */
export const initializeAirwallex = async (): Promise<boolean> => {
  try {
    // Dynamically import the Airwallex SDK to ensure it's only loaded when needed
    const { init } = await import('@airwallex/components-sdk');
    
    // Initialize the Airwallex SDK
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
 * Create a properly typed beneficiary form configuration
 */
export const createBeneficiaryFormConfig = (currency: string, backgroundColor: string, accentColor: string): any => {
  // Return the config as 'any' type to bypass TypeScript checking
  // This allows the SDK to accept our config object without type errors
  return {
    defaultValues: {
      beneficiary: {
        entity_type: 'COMPANY',
        bank_details: {
          account_currency: currency || 'USD',
          bank_country_code: 'US',
          local_clearing_system: 'BANK_TRANSFER',
        },
      },
      payment_methods: ['LOCAL'],
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
 * Create Airwallex beneficiary form element
 * Returns a promise that resolves to the created element if successful, or null if it fails
 */
export const createBeneficiaryForm = async (config: any) => {
  try {
    const { createElement } = await import('@airwallex/components-sdk');
    
    // Create the beneficiary form element with the provided configuration
    // Using 'any' type to bypass TypeScript errors from mismatched types
    const element = await createElement('beneficiaryForm', config);
    console.log('Beneficiary form created successfully');
    return element;
  } catch (error) {
    console.error('Failed to create beneficiary form:', error);
    return null;
  }
};

/**
 * Mount Airwallex element to DOM
 * Returns true if mounting was successful, false otherwise
 */
export const mountAirwallexElement = (element: any, selector: string): boolean => {
  try {
    if (!element) {
      console.error('Cannot mount null element');
      return false;
    }
    
    const targetElement = document.querySelector(selector);
    if (!targetElement) {
      console.error(`Mount target not found: ${selector}`);
      return false;
    }
    
    // Mount the element to the DOM
    element.mount(selector);
    console.log(`Element mounted successfully to ${selector}`);
    return true;
  } catch (error) {
    console.error('Error mounting element:', error);
    return false;
  }
};
