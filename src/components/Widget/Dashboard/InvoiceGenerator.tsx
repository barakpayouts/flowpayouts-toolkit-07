
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, FileText } from "lucide-react";
import { usePayoutWidget, InvoiceItemData } from '@/contexts/PayoutWidgetContext';
import { formatCurrency } from '@/lib/utils';

const InvoiceGenerator = () => {
  const { 
    isInvoiceGeneratorOpen, 
    setIsInvoiceGeneratorOpen, 
    invoiceFormData, 
    setInvoiceFormData,
    handleGenerateInvoice,
    companyName
  } = usePayoutWidget();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceFormData({
      ...invoiceFormData,
      [name]: value
    });
  };

  const handleItemChange = (id: string, field: keyof InvoiceItemData, value: string | number) => {
    const updatedItems = invoiceFormData.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Recalculate tax and total
        const quantity = typeof updatedItem.quantity === 'number' ? updatedItem.quantity : parseFloat(updatedItem.quantity as unknown as string) || 0;
        const unitPrice = typeof updatedItem.unitPrice === 'number' ? updatedItem.unitPrice : parseFloat(updatedItem.unitPrice as unknown as string) || 0;
        
        updatedItem.tax = quantity * unitPrice * (invoiceFormData.taxRate / 100);
        updatedItem.total = (quantity * unitPrice) + updatedItem.tax;
        
        return updatedItem;
      }
      return item;
    });

    setInvoiceFormData({
      ...invoiceFormData,
      items: updatedItems
    });
  };

  const addItem = () => {
    const newItem: InvoiceItemData = {
      id: `item-${Date.now()}`,
      description: "",
      quantity: 1,
      unitPrice: 0,
      tax: 0,
      total: 0
    };

    setInvoiceFormData({
      ...invoiceFormData,
      items: [...invoiceFormData.items, newItem]
    });
  };

  const removeItem = (id: string) => {
    if (invoiceFormData.items.length <= 1) {
      return; // Don't remove the last item
    }
    
    setInvoiceFormData({
      ...invoiceFormData,
      items: invoiceFormData.items.filter(item => item.id !== id)
    });
  };

  const calculateSubtotal = () => {
    return invoiceFormData.items.reduce((sum, item) => {
      const quantity = typeof item.quantity === 'number' ? item.quantity : parseFloat(item.quantity as unknown as string) || 0;
      const unitPrice = typeof item.unitPrice === 'number' ? item.unitPrice : parseFloat(item.unitPrice as unknown as string) || 0;
      return sum + (quantity * unitPrice);
    }, 0);
  };

  const calculateTaxTotal = () => {
    return invoiceFormData.items.reduce((sum, item) => {
      const quantity = typeof item.quantity === 'number' ? item.quantity : parseFloat(item.quantity as unknown as string) || 0;
      const unitPrice = typeof item.unitPrice === 'number' ? item.unitPrice : parseFloat(item.unitPrice as unknown as string) || 0;
      return sum + (quantity * unitPrice * (invoiceFormData.taxRate / 100));
    }, 0);
  };

  const calculateWithholding = () => {
    const subtotal = calculateSubtotal();
    return subtotal * (invoiceFormData.withholdingTax / 100);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxAmount = calculateTaxTotal();
    const withholding = calculateWithholding();
    return subtotal + taxAmount - withholding;
  };

  const handleSubmit = () => {
    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!invoiceFormData.invoiceNumber) {
      newErrors.invoiceNumber = "Invoice number is required";
    }
    
    if (!invoiceFormData.issueDate) {
      newErrors.issueDate = "Issue date is required";
    }
    
    if (!invoiceFormData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }
    
    // Validate items
    let hasItemErrors = false;
    invoiceFormData.items.forEach((item, index) => {
      if (!item.description) {
        newErrors[`item-${index}-description`] = "Description is required";
        hasItemErrors = true;
      }
      
      if (item.quantity <= 0) {
        newErrors[`item-${index}-quantity`] = "Quantity must be greater than 0";
        hasItemErrors = true;
      }
      
      if (item.unitPrice <= 0) {
        newErrors[`item-${index}-unitPrice`] = "Price must be greater than 0";
        hasItemErrors = true;
      }
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    // Submit the form
    handleGenerateInvoice();
  };

  return (
    <Dialog open={isInvoiceGeneratorOpen} onOpenChange={setIsInvoiceGeneratorOpen}>
      <DialogContent className="w-full max-w-3xl max-h-[90%] overflow-y-auto widget-dialog-content">
        <DialogHeader>
          <DialogTitle>Generate New Invoice</DialogTitle>
          <DialogDescription>
            Create a detailed invoice to request payment for your services
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-medium">From: {companyName}</h3>
              <p className="text-sm text-muted-foreground">Your company information will be automatically included</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Input
              label="Invoice Number"
              name="invoiceNumber"
              value={invoiceFormData.invoiceNumber}
              onChange={handleInputChange}
              error={errors.invoiceNumber}
            />
            
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Issue Date"
                name="issueDate"
                type="date"
                value={invoiceFormData.issueDate}
                onChange={handleInputChange}
                error={errors.issueDate}
              />
              
              <Input
                label="Due Date"
                name="dueDate"
                type="date"
                value={invoiceFormData.dueDate}
                onChange={handleInputChange}
                error={errors.dueDate}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Invoice Items</h3>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={addItem}
              className="flex items-center gap-1"
            >
              <Plus size={16} />
              Add Item
            </Button>
          </div>
          
          <div className="space-y-4 max-h-[300px] overflow-y-auto p-1">
            {invoiceFormData.items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 p-3 border border-input rounded-md bg-background/50">
                <div className="col-span-12 sm:col-span-4">
                  <Input
                    label="Description"
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    error={errors[`item-${index}-description`]}
                  />
                </div>
                
                <div className="col-span-4 sm:col-span-2">
                  <Input
                    label="Quantity"
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    error={errors[`item-${index}-quantity`]}
                  />
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                  <Input
                    label="Unit Price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    error={errors[`item-${index}-unitPrice`]}
                  />
                </div>
                
                <div className="col-span-8 sm:col-span-2">
                  <Input
                    label="Amount"
                    value={formatCurrency(item.quantity * item.unitPrice)}
                    disabled
                  />
                </div>
                
                <div className="col-span-4 sm:col-span-1 flex items-end justify-center pb-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive/80"
                    onClick={() => removeItem(item.id)}
                    disabled={invoiceFormData.items.length <= 1}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Input
                label="Tax Rate (%)"
                name="taxRate"
                type="number"
                min="0"
                max="100"
                value={invoiceFormData.taxRate}
                onChange={(e) => setInvoiceFormData({
                  ...invoiceFormData,
                  taxRate: parseFloat(e.target.value) || 0
                })}
              />
              
              <Input
                label="Withholding Tax (%)"
                name="withholdingTax"
                type="number"
                min="0"
                max="100"
                value={invoiceFormData.withholdingTax}
                onChange={(e) => setInvoiceFormData({
                  ...invoiceFormData,
                  withholdingTax: parseFloat(e.target.value) || 0
                })}
              />
              
              <Input
                label="Notes/Terms"
                name="notes"
                value={invoiceFormData.notes}
                onChange={handleInputChange}
                placeholder="Payment terms, special instructions, etc."
              />
            </div>
            
            <div className="space-y-4 p-4 bg-muted/20 rounded-md">
              <div className="flex justify-between">
                <span className="text-sm">Subtotal:</span>
                <span className="font-medium">{formatCurrency(calculateSubtotal())}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm">Tax ({invoiceFormData.taxRate}%):</span>
                <span className="font-medium">{formatCurrency(calculateTaxTotal())}</span>
              </div>
              
              {invoiceFormData.withholdingTax > 0 && (
                <div className="flex justify-between">
                  <span className="text-sm">Withholding ({invoiceFormData.withholdingTax}%):</span>
                  <span className="font-medium text-red-500">-{formatCurrency(calculateWithholding())}</span>
                </div>
              )}
              
              <div className="flex justify-between pt-2 border-t">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-lg">{formatCurrency(calculateTotal())}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between mt-6">
          <Button variant="outline" onClick={() => setIsInvoiceGeneratorOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="flex items-center gap-2"
          >
            <FileText size={16} />
            Generate Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceGenerator;
