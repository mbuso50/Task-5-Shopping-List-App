// task-5-shopping-list-app/src/Components/features/Shopping-list/Demo-component.tsx
import React from 'react';
import Button from '../Button/Button';

interface DemoComponentProps {
    onGetStarted: () => void;
    onLearnMore: () => void;
}

const DemoComponent: React.FC<DemoComponentProps> = ({ onGetStarted, onLearnMore }) => {
    const demoItems = [
        { id: 1, name: 'Fresh Groceries', completed: false },
        { id: 2, name: 'Household Supplies', completed: true },
        { id: 3, name: 'Electronics', completed: false },
        { id: 4, name: 'Clothing', completed: false }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#BBFBFF] via-[#8DD8FF] to-[#4E71FF] py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <img
                        src="/Verse_Shoppers-removebg.png"
                        alt="Verse Shoppers"
                        className="h-20 w-auto mx-auto mb-6"
                    />
                    <h1 className="text-4xl font-bold text-[#5409DA] mb-4">
                        Experience Smart Shopping
                    </h1>
                    <p className="text-lg text-[#4E71FF] max-w-2xl mx-auto">
                        Discover how Verse Shoppers can transform your shopping experience with intuitive lists and smart organization.
                    </p>
                </div>

                {/* Demo Content */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Demo List */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                        <h2 className="text-2xl font-bold text-[#5409DA] mb-4">Live Demo</h2>
                        <div className="space-y-3">
                            {demoItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex items-center p-3 rounded-lg border ${item.completed
                                        ? 'bg-green-50 border-green-200 text-green-700'
                                        : 'bg-white border-[#8DD8FF] text-[#5409DA]'
                                        }`}
                                >
                                    <div className={`w-4 h-4 rounded-full border-2 ${item.completed
                                        ? 'bg-green-500 border-green-500'
                                        : 'border-[#5409DA]'
                                        } mr-3`} />
                                    <span className={item.completed ? 'line-through opacity-75' : ''}>
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                        <h2 className="text-2xl font-bold text-[#5409DA] mb-4">Key Features</h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="w-6 h-6 bg-[#5409DA] rounded-full flex items-center justify-center mr-3 mt-1">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#5409DA]">Smart Organization</h3>
                                    <p className="text-[#4E71FF] text-sm">Categorize and prioritize your shopping items effortlessly.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-6 h-6 bg-[#5409DA] rounded-full flex items-center justify-center mr-3 mt-1">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#5409DA]">Real-time Sync</h3>
                                    <p className="text-[#4E71FF] text-sm">Access your lists from any device, anywhere.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-6 h-6 bg-[#5409DA] rounded-full flex items-center justify-center mr-3 mt-1">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#5409DA]">Budget Tracking</h3>
                                    <p className="text-[#4E71FF] text-sm">Keep track of your spending with built-in budget features.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold text-[#5409DA] mb-4">Ready to Get Started?</h2>
                        <p className="text-[#4E71FF] mb-6">
                            Join thousands of smart shoppers who are already organizing their shopping with Verse Shoppers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={onGetStarted}
                                variant="primary"
                                button_size="large"
                                type="button"
                                className="min-w-[200px]"
                            >
                                Create Your First List
                            </Button>
                            <Button
                                onClick={onLearnMore}
                                variant="secondary"
                                button_size="large"
                                className="min-w-[200px]"
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemoComponent;