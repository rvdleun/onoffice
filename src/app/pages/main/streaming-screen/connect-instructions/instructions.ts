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
        hasImages: true,
        id: 'cardboard-android',
        title: 'Cardboard (Android)',
        steps: [
            'Join the same network as this computer.',
            'Open the chrome browser',
            {
                code: 'Browse to http://openoffice.org/code and enter code *CODE*.',
                ip: 'Browse to http://*IP*.',
            },
            'Press the \'Enter Office\' button.'
        ],
    },
    {
        hasImages: false,
        id: 'oculus-go',
        title: 'Oculus Go',
        steps: [
            'Join the same network as this computer.',
            'Open the Oculus browser',
            {
                code: 'Browse to http://openoffice.org/code and enter code *CODE*.',
                ip: 'Browse to http://*IP*. Note that http:// is required!',
            },
            'Press the \'Enter Office\' button.'
        ],
    },
    {
        hasImages: false,
        id: 'htc-vive',
        title: 'HTC Vive',
        steps: [
            'Open an Internet browser(Edge, Chrome or Firefox)',
            'If the Vive is connected to this computer, browse to http://localhost:24242.',
            {
                code: 'If not, browse to http://openoffice.org/code and enter code *CODE*.',
                ip: 'If not, browse to http://*IP*.',
            },
            'Press the \'Enter Office\' button.'
        ],
    },
];