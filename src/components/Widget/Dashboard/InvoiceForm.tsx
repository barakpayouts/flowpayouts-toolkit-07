
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { usePayoutWidget, InvoiceItemData } from '@/contexts/PayoutWidgetContext';
import { formatCurrency, debugLog } from "@/lib/utils";

const InvoiceForm: React.FC = () => {
  const { config } = useWidgetConfig();
  const { 
    invoiceFormData, 
    setInvoiceFormData, 
    handleGenerateInvoice,
    companyName
  } = usePayoutWidget();
  
  const [clientCompany, setClientCompany] = useState("Client Company");
  const [clientAddress, setClientAddress] = useState("123 Client Street, City");
  const [clientEmail, setClientEmail] = useState("client@example.com");
  const [vendorAddress, setVendorAddress] = useState("456 Vendor Street, City");
  const [vendorEmail, setVendorEmail] = useState("vendor@example.com");

  const calculateItemTotal = (item: InvoiceItemData): number => {
    const subtotal = item.quantity * item.unitPrice;
    const tax = subtotal * (invoiceFormData.taxRate / 100);
    return subtotal + tax;
  };

  const calculateSubtotal = (): number => {
    return invoiceFormData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const calculateTaxTotal = (): number => {
    return invoiceFormData.items.reduce((sum, item) => {
      const itemSubtotal = item.quantity * item.unitPrice;
      return sum + (itemSubtotal * (invoiceFormData.taxRate / 100));
    }, 0);
  };

  const calculateWithholdingAmount = (): number => {
    const subtotal = calculateSubtotal();
    return subtotal * (invoiceFormData.withholdingTax / 100);
  };

  const calculateGrandTotal = (): number => {
    const subtotal = calculateSubtotal();
    const taxTotal = calculateTaxTotal();
    const withholdingAmount = calculateWithholdingAmount();
    return subtotal + taxTotal - withholdingAmount;
  };

  const handleItemChange = (index: number, field: keyof InvoiceItemData, value: string | number) => {
    const updatedItems = [...invoiceFormData.items];
    
    if (field === 'quantity' || field === 'unitPrice') {
      const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: numValue,
        total: calculateItemTotal({
          ...updatedItems[index],
          [field]: numValue
        })
      };
    } else {
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };
    }
    
    setInvoiceFormData({
      ...invoiceFormData,
      items: updatedItems
    });
    
    debugLog("Updated invoice items", updatedItems);
  };

  const addNewItem = () => {
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

  const removeItem = (index: number) => {
    if (invoiceFormData.items.length <= 1) {
      return; // Keep at least one item
    }
    
    const updatedItems = [...invoiceFormData.items];
    updatedItems.splice(index, 1);
    
    setInvoiceFormData({
      ...invoiceFormData,
      items: updatedItems
    });
  };

  const handleInputChange = (field: string, value: string | number) => {
    setInvoiceFormData({
      ...invoiceFormData,
      [field]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    debugLog("Submitting invoice form", invoiceFormData);
    handleGenerateInvoice();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium mb-2 text-white/80">From (Vendor)</h3>
          <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
            <div>
              <Label htmlFor="company-name" className="text-white/70">Company Name</Label>
              <Input 
                id="company-name" 
                value={companyName}
                disabled
                className="bg-white/10 border-white/10 text-white"
              />
            </div>
            <div>
              <Label htmlFor="vendor-address" className="text-white/70">Address</Label>
              <Input 
                id="vendor-address" 
                value={vendorAddress}
                onChange={(e) => setVendorAddress(e.target.value)}
                className="bg-white/10 border-white/10 text-white"
              />
            </div>
            <div>
              <Label htmlFor="vendor-email" className="text-white/70">Email</Label>
              <Input 
                id="vendor-email" 
                type="email"
                value={vendorEmail}
                onChange={(e) => setVendorEmail(e.target.value)}
                className="bg-white/10 border-white/10 text-white"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2 text-white/80">To (Client)</h3>
          <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
            <div>
              <Label htmlFor="client-company" className="text-white/70">Company Name</Label>
              <Input 
                id="client-company" 
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
                className="bg-white/10 border-white/10 text-white"
              />
            </div>
            <div>
              <Label htmlFor="client-address" className="text-white/70">Address</Label>
              <Input 
                id="client-address" 
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                className="bg-white/10 border-white/10 text-white"
              />
            </div>
            <div>
              <Label htmlFor="client-email" className="text-white/70">Email</Label>
              <Input 
                id="client-email" 
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="bg-white/10 border-white/10 text-white"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="invoice-number" className="text-white/70">Invoice Number</Label>
          <Input 
            id="invoice-number" 
            value={invoiceFormData.invoiceNumber}
            onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
            className="bg-white/10 border-white/10 text-white"
          />
        </div>
        <div>
          <Label htmlFor="issue-date" className="text-white/70">Issue Date</Label>
          <Input 
            id="issue-date" 
            type="date"
            value={invoiceFormData.issueDate}
            onChange={(e) => handleInputChange('issueDate', e.target.value)}
            className="bg-white/10 border-white/10 text-white"
          />
        </div>
        <div>
          <Label htmlFor="due-date" className="text-white/70">Due Date</Label>
          <Input 
            id="due-date" 
            type="date"
            value={invoiceFormData.dueDate}
            onChange={(e) => handleInputChange('dueDate', e.target.value)}
            className="bg-white/10 border-white/10 text-white"
          />
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-white/80">Items</h3>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={addNewItem}
            className="text-white border-white/20 hover:bg-white/10"
          >
            <Plus size={14} className="mr-1" /> Add Item
          </Button>
        </div>
        
        <div className="space-y-3">
          {invoiceFormData.items.map((item, index) => (
            <div key={item.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-5">
                  <Label htmlFor={`item-desc-${index}`} className="text-white/70">Description</Label>
                  <Input 
                    id={`item-desc-${index}`} 
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    className="bg-white/10 border-white/10 text-white"
                    placeholder="Service or product description"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`item-qty-${index}`} className="text-white/70">Quantity</Label>
                  <Input 
                    id={`item-qty-${index}`} 
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    className="bg-white/10 border-white/10 text-white"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`item-price-${index}`} className="text-white/70">Unit Price</Label>
                  <Input 
                    id={`item-price-${index}`} 
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                    className="bg-white/10 border-white/10 text-white"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-white/70">Total</Label>
                  <div className="h-10 flex items-center px-3 bg-white/10 border border-white/10 rounded-md text-white">
                    {formatCurrency(item.quantity * item.unitPrice)}
                  </div>
                </div>
                <div className="col-span-1 flex items-end justify-center">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeItem(index)}
                    disabled={invoiceFormData.items.length <= 1}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="tax-rate" className="text-white/70">
            Tax Rate (%, VAT/Sales Tax/GST)
          </Label>
          <Input 
            id="tax-rate" 
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={invoiceFormData.taxRate}
            onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value) || 0)}
            className="bg-white/10 border-white/10 text-white"
          />
        </div>
        <div>
          <Label htmlFor="withholding-tax" className="text-white/70">
            Withholding Tax Exemption (%)
          </Label>
          <Input 
            id="withholding-tax" 
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={invoiceFormData.withholdingTax}
            onChange={(e) => handleInputChange('withholdingTax', parseFloat(e.target.value) || 0)}
            className="bg-white/10 border-white/10 text-white"
          />
        </div>
        <div>
          <Label htmlFor="invoice-notes" className="text-white/70">Notes</Label>
          <Input 
            id="invoice-notes" 
            value={invoiceFormData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            className="bg-white/10 border-white/10 text-white"
            placeholder="Payment terms, etc."
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <div className="w-64 bg-white/5 border border-white/10 rounded-lg p-3 space-y-2">
          <div className="flex justify-between">
            <span className="text-white/70">Subtotal:</span>
            <span className="text-white">{formatCurrency(calculateSubtotal())}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Tax ({invoiceFormData.taxRate}%):</span>
            <span className="text-white">{formatCurrency(calculateTaxTotal())}</span>
          </div>
          {invoiceFormData.withholdingTax > 0 && (
            <div className="flex justify-between">
              <span className="text-white/70">Withholding ({invoiceFormData.withholdingTax}%):</span>
              <span className="text-white">-{formatCurrency(calculateWithholdingAmount())}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-white/10">
            <span className="text-white font-medium">Total:</span>
            <span className="text-white font-medium">{formatCurrency(calculateGrandTotal())}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <Button 
          type="submit" 
          className="text-gray-900 font-semibold hover:text-gray-900"
          style={{
            background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)`,
            boxShadow: `0 4px 15px ${config.accentColor}40`,
          }}
        >
          Generate Invoice
        </Button>
      </div>
    </form>
  );
};

export default InvoiceForm;
