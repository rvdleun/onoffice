export type Step = {
    code: string;
    ip: string;
};

export type Instructions = {
    hasImages: boolean;
    id: string,
    title: string,
    steps: (Step | string)[],
};

export const HeadsetInstructions = [
    {
        hasImages: false,
        id: 'basic',
        title: 'How to connect',
        steps: [
            'Join the same network as this computer.',
            'Open the chrome browser',
            'Browse to http://*IP*.',
            'Press the \'Enter Office\' button.'
        ]
    },
    {
        hasImages: true,
        id: 'cardboard-android',
        title: 'Android',
        steps: [
            'Join the same network as this computer.',
            'Open the chrome browser',
            {
                code: 'Browse to http://onoffice.tech/connect and enter code *CODE*.',
                ip: 'Browse to http://*IP*.',
            },
            'Press the \'Enter Office\' button.'
        ],
    },
    {
        hasImages: false,
        id: 'htc-vive',
        title: 'Vive',
        steps: [
            'Open an Internet browser(Edge, Chrome or Firefox)',
            'If the Vive is connected to this computer, browse to http://localhost:24242.',
            {
                code: 'If not, browse to http://onoffice.tech/connect and enter code *CODE*.',
                ip: 'If not, browse to http://*IP*.',
            },
            'Press the \'Enter Office\' button.'
        ],
    },
    {
        hasImages: false,
        id: 'oculus-go',
        title: 'Go',
        steps: [
            'Join the same network as this computer.',
            'Open the Oculus browser',
            {
                code: 'Browse to http://onoffice.tech/connect and enter code *CODE*.',
                ip: 'Browse to http://*IP*. Note that http:// is required!',
            },
            'Press the \'Enter Office\' button.'
        ],
    },
    {
        hasImages: false,
        id: 'oculus-rift',
        title: 'Rift',
        steps: [
            'Open an Internet browser(Edge, Chrome or Firefox)',
            'If the Rift is connected to this computer, browse to http://localhost:24242.',
            {
                code: 'If not, browse to http://onoffice.tech/connect and enter code *CODE*.',
                ip: 'If not, browse to http://*IP*.',
            },
            'Press the \'Enter Office\' button.'
        ],
    },
];
