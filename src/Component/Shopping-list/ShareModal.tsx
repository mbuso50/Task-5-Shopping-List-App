import React, { useState } from 'react';
import Button from '../Button/Button';
import type { ShoppingItem } from '../types/Types';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    listName: string;
    listId: string;
    items: ShoppingItem[];
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, listName, listId, items }) => {
    const [copied, setCopied] = useState(false);
    const shareableLink = `${window.location.origin}/shared-list/${listId}`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareableLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const textArea = document.createElement('textarea');
            textArea.value = shareableLink;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleExportTextFile = () => {
        const textContent = `SHOPPING LIST: ${listName}\n\n${items.map(item =>
            `- ${item.name} (Qty: ${item.quantity})${item.category ? ` [${item.category}]` : ''}${item.completed ? ' ✅' : ''}`
        ).join('\n')}\n\nGenerated: ${new Date().toLocaleDateString()}\nShared from Verse Shoppers App`;

        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${listName.replace(/\s+/g, '_')}_shopping_list.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleExportPDF = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            const itemsHTML = items.map(item =>
                `<div class="item ${item.completed ? 'completed' : ''}">
                    <strong>${item.name}</strong> (Qty: ${item.quantity})${item.category ? ` - ${item.category}` : ''}
                </div>`
            ).join('');

            printWindow.document.write(`
                <html>
                    <head>
                        <title>${listName}</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            h1 { color: #5409DA; }
                            .item { margin: 10px 0; padding: 10px; border-left: 3px solid #5409DA; }
                            .completed { text-decoration: line-through; color: #666; }
                            .footer { margin-top: 20px; color: #666; font-size: 12px; }
                        </style>
                    </head>
                    <body>
                        <h1>${listName}</h1>
                        <p>Shopping List</p>
                        <div id="items">
                            ${itemsHTML}
                        </div>
                        <div class="footer">
                            Generated from Verse Shoppers App on ${new Date().toLocaleDateString()}
                        </div>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    const handleEmailShare = () => {
        const subject = `Check out my shopping list: ${listName}`;
        const body = `I'd like to share my shopping list "${listName}" with you:\n\n${shareableLink}\n\nYou can view it online or export it as a text file.`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-[#5409DA]">Share Shopping List</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                        *
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Shareable Link */}
                    <div>
                        <label className="block text-sm font-medium text-[#5409DA] mb-2">
                            Shareable Link
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={shareableLink}
                                readOnly
                                className="flex-1 px-3 py-2 border border-[#8DD8FF] rounded-lg text-sm"
                            />
                            <Button
                                onClick={handleCopyLink}
                                variant={copied ? "primary" : "secondary"}
                                button_size="small"
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </Button>
                        </div>
                    </div>

                    {/* Export Options */}
                    <div>
                        <label className="block text-sm font-medium text-[#5409DA] mb-2">
                            Export as Document
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                onClick={handleExportTextFile}
                                variant="secondary"
                                button_size="small"
                                className="flex items-center justify-center gap-2"
                            >
                                Text File
                            </Button>
                            <Button
                                onClick={handleExportPDF}
                                variant="secondary"
                                button_size="small"
                                className="flex items-center justify-center gap-2"
                            >
                                Print/PDF
                            </Button>
                        </div>
                    </div>

                    {/* Email Sharing */}
                    <div>
                        <label className="block text-sm font-medium text-[#5409DA] mb-2">
                            Share via Email
                        </label>
                        <Button
                            onClick={handleEmailShare}
                            variant="secondary"
                            button_size="medium"
                            className="w-full flex items-center justify-center gap-2"
                        >
                            Share via Email
                        </Button>
                    </div>

                    {/* Sharing Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-blue-700 text-sm">
                            <strong>Note:</strong> Choose text file export for offline access or email to share with others.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button
                        onClick={onClose}
                        variant="secondary"
                        button_size="medium"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;