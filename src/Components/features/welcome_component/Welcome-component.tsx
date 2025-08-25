// task-5-shopping-list-app/src/Components/features/welcome_component/Welcome-component.tsx
import React from 'react';
import Button from '../../Button/Button';
import type { WelcomeComponentProps } from '../../types/Types';

const WelcomeComponent: React.FC<WelcomeComponentProps> = ({
    onCreateList,
    onSeeDemo
}) => {
    return (
        <div className="relative isolate px-4 sm:px-6 lg:px-8 flex-1 flex items-center justify-center py-8">
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#BBFBFF] to-[#4E71FF] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>

            <div className="mx-auto max-w-2xl lg:max-w-4xl text-center px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#5409DA]">
                    ShopList Pro
                </h1>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-[#4E71FF] max-w-2xl mx-auto leading-relaxed">
                    Organize your shopping with ease. Create, manage, and share your shopping lists
                    across all your devices. Never forget an item again!
                </p>
                <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                    <Button
                        type="create_list"
                        variant="primary"
                        button_size="large"
                        onClick={onCreateList}
                    >
                        Create Your First List
                    </Button>
                    <Button
                        type="forgotten"
                        variant="tertiary"
                        button_size="medium"
                        onClick={onSeeDemo}
                    >
                        See Demo <span aria-hidden="true">→</span>
                    </Button>
                </div>
            </div>

            <div
                className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#8DD8FF] to-[#4E71FF] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
        </div>
    );
};

export default WelcomeComponent;