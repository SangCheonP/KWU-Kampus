/*
건물 없을 경우 평면도가 아예 나타나지 않는 문제

01 80주년기념관 B3~4 : 로딩 오류
02 누리관 1~5
03 다산재 1~4
04 복지관 B1~5 : 목록 오류
05 비마관 1~8 : 일부 '-x' 방 오류 ( ex. 104-1, 317-2 ), '--0' 방 처리
06 빛솔재A B3~7 : 'B-', '--0' 방 처리
07 빛솔재B B1~7 : '--0' 방 처리
08 새빛관 B1~9
09 아이스링크장 B2~B1 : 정보 부재
10 연구관 B2~10
11 연촌재 B1~3 : 정보 부재
12 옥의관 B1~8 : 목록 오류
13 인터네셔널 B1~3
14 참빛관 B3~10 : 목록 오류
15 한울관 B3~7
16 한천재 B1~5 : 정보 부재
17 화도관 B1~6
*/

const position = {

    // 80주년 기념관 & 광운 스퀘어
    기념관: [],

    누리관: [
        [ [0.555, 0.65], [0.545, 0.79], [0.1, 0.1], [0.1, 0.1], [0.1, 0.1],
            [0.49, 0.71], [0.42, 0.68], [0.42, 0.58], [0.42, 0.48], [0.42, 0.38],
            [0.42, 0.275], [0.42, 0.175], [0.42, 0.075], [0.43, -0.34], [0.55, -0.16] ],
        [ [0.44, 0.7], [0.35, 0.68], [0.4, 0.0], [0.4, 0.0], [0.42, 0.0],
            [0.35, 0.0], [0.42, 0.0], [0.42, 0.0], [0.42, 0.0], [0.42, 0.0],
            [0.35, 0.12], [0.35, 0.02], [0.35, -0.08], [0.35, -0.18], [0.35, 0.0],
            [0.43, -0.15], [0.55, -0.2], [0.61, -0.28], [0.61, -0.28], [0.61, -0.28],
            [0.61, -0.21], [0.61, -0.16], [0.61, -0.12], [0.61, -0.12], [0.61, -0.12],
            [0.61, -0.07], [0.61, -0.02], [0.61, -0.02], [0.61, 0.06], [0.52, -0.15],
            [0.52, -0.3], [0.465, -0.8], [0.5, -0.85], [0.48, -0.74] ],
        [ [0.43, 0.7], [0.35, 0.68], [0.4, 0.0], [0.4, 0.0], [0.42, 0.0],
            [0.35, 0.55], [0.35, 0.43], [0.42, 0.4], [0.35, 0.25], [0.42, 0.0],
            [0.35, 0.07], [0.35, -0.06], [0.35, -0.08], [0.35, -0.18], [0.35, 0.0],
            [0.43, -0.15], [0.533, -0.2], [0.61, -0.25], [0.61, -0.13], [0.61, -0.0],
            [0.61, 0.03], [0.61, 0.03], [0.61, 0.08], [0.61, 0.18], [0.52, 0.7],
            [0.52, 0.55] ],
        [ [0.43, 0.71], [0.35, 0.79], [0.35, 0.58], [0.35, 0.33], [0.35, 0.1],
            [0.35, -0.15], [0.43, -0.15], [0.465, -0.2], [0.5, -0.25], [0.535, -0.3],
            [0.61, -0.35], [0.61, -0.2], [0.61, -0.05], [0.61, 0.03], [0.61, 0.08],
            [0.61, 0.09], [0.61, 0.135], [0.535, 0.02], [0.535, -0.14] ],
        [[0.43, 0.71], [0.35, 0.79], [0.35, 0.655], [0.35, 0.53], [0.35, 0.43],
            [0.3, 0.0], [0.3, 0.0], [0.3, 0.0], [0.3, 0.0], [0.3, 0.0],
            [0.3, 0.0], [0.3, 0.0], [0.3, 0.0], [0.3, 0.0], [0.3, 0.0],
            [0.3, 0.0], [0.3, 0.0], [0.43, -0.1], [0.465, -0.15], [0.465, -0.05],
            [0.5, -0.1], [0.5, -0.3], [0.535, -0.35], [0.6, 0.0], [0.6, 0.0],
            [0.6, 0.0], [0.6, 0.0], [0.6, 0.0], [0.6, 0.0], [0.6, 0.0],
            [0.6, 0.0], [0.6, 0.0], [0.6, 0.0], [0.6, 0.0], [0.6, 0.0],
            [0.6, 0.0], [0.61, 0.255], [0.6, 0.0], [0.5, 0.7], [0.5, 0.7] ]
    ],

    다산재: [
        [ [0.55, 0.86], [0.6, 0.58], [0.6, 0.035], [0.325, -0.033] ],
        [ [0.35, 0.86], [0.58, 0.8], [0.6, 0.3], [0.325, -0.033] ],
        [ [0.35, 0.61], [0.35, 0.79], [0.58, 0.75], [0.6, 0.6], [0.6, 0.4],
            [0.6, -0.033], [0.3, 0.1] ],
        [ [0.3, 0.6], [0.6, 0.63], [0.6, 0.4], [0.6, 0.1], [0.3, 0.1] ]
    ],

    복지관: [
        [ [0.4, 0.8], [0.58, 0.6], [0.37, 0.71], [0.25, 0.66], [0.125, 0.61],
            [0.6, 0.5], [0.65, 0.3], [0.7, 0.4], [0.7, 0.2], [0.7, 0.1] ],
        [ [0.7, 0.1], [0.7, 0.1], [0.7, 0.1], [0.4, 0.8], [0.3, 0.8],
            [0.2, 0.8], [0.1, 0.8] ],
        [ [0.7, 0.2], [0.7, 0.3], [0.7, 0.4], [0.7, 0.7], [0, 0],
            [0.4, 0.8], [0.2, 0.8] ],
        [ [0.7, 0.1], [0.8, 0.2], [0.8, 0.4], [0.8, 0.5], [0.7, 0.2],
            [0.7, 0.4], [0.7, 0.6], [0.8, 0.7], [0.6, 0.7], [0, 0],
            [0.7, 0.8], [0.6, 0.8], [0.3, 0.9] ],
        [ [0.7, 0.2], [0.8, 0.2], [0.8, 0.4], [0.8, 0.5], [0.8, 0.7],
            [0.7, 0.8], [0.7, 0.8], [0.6, 0.8], [0.6, 0.9], [0.5, 0.6],
            [0.5, 0.7], [0.5, 0.7], [0.4, 0.9], [0.35, 0.9], [0.3, 0.9],
            [0.25, 0.9], [0.2, 0.9], [0.15, 0.9], [0.1, 0.9], [0.1, 0.8],
            [0.15, 0.8], [0.2, 0.8], [0.25, 0.8], [0.3, 0.8], [0.4, 0.8] ],
        [ [0.8, 0.1], [0.8, 0.1], [0.8, 0.1], [0.8, 0.1], [0.8, 0.1],
            [0.8, 0.1], [0.7, 0.1], [0.7, 0.1], [0.7, 0.1], [0.7, 0.1],
            [0.7, 0.1], [0.4, 0.9], [0.35, 0.9], [0.3, 0.9], [0.25, 0.9],
            [0.2, 0.9], [0.15, 0.9], [0.1, 0.9], [0.1, 0.8], [0.15, 0.8],
            [0.2, 0.8], [0.25, 0.8], [0.3, 0.8], [0.35, 0.8], [0.4, 0.8],
            [0.5, 0.9] ]
    ],

    비마관: [
        [ [0.2, 0.1], [0.4, 0.1], [0.5, 0.3], [0.6, 0.3], [0.6, 0.9],
            [0.4, 0.9], [0.2, 0.9], [0.5, 0.9], [0.4, 0.3], [0.3, 0.3] ],
        [ [0.39, 0.08], [0.55, -0.02], [0.5, 0.0], [0.66, 0.02], [0, 0],
            [0.5, 0.3], [0.4, 0.3], [0.3, 0.2], [0.26, 0.65], [0, 0],
            [0.375, 0.57], [0.51, 0.52], [0.53, 0.6], [0.47, 0.56], [0.3, 0.9],
            [0, 0], [0.32, 0.54], [0.26, 0.49], [0.39, 0.39], [0.26, 0.1] ],
        [ [0.1, 0.8], [0.1, 0.8], [0.1, 0.8], [0, 0], [0.2, 0.9],
            [0.3, 0.9], [0.3, 0.9], [0.35, 0.9], [0.4, 0.9], [0.4, 0.8],
            [0.3, 0.8], [0, 0], [0, 0], [0.4, 0.6], [0.45, 0.6],
            [0.5, 0.6], [0.6, 0.6], [0.5, 0.4], [0.4, 0.3], [0.7, 0.9],
            [0.6, 0.9], [0, 0], [0, 0], [0.25, 0.2], [0.25, 0.2],
            [0.2, 0.2], [0.2, 0.2], [0.2, 0.2], [0.25, 0.2], [0.1, 0.4],
            [0.1, 0.6], [0.2, 0.5], [0, 0], [0, 0], [0, 0],
            [0, 0], [0, 0], [0, 0], [0, 0], [0.1, 0.3] ],
        [ [0.1, 0.3], [0.1, 0.3], [0.1, 0.3], [0.1, 0.3], [0.1, 0.3],
            [0.1, 0.3], [0.1, 0.3], [0, 0], [0.2, 0.8], [0.3, 0.9],
            [0.35, 0.9], [0.4, 0.9], [0.45, 0.9], [0.4, 0.8], [0.3, 0.8],
            [0, 0], [0, 0], [0.4, 0.6], [0.5, 0.6], [0.55, 0.6],
            [0.7, 0.6], [0, 0], [0, 0], [0.65, 0.4], [0.6, 0.4],
            [0.55, 0.4], [0.5, 0.3], [0.4, 0.3], [0.3, 0.3], [0.2, 0.3],
            [0.7, 0.9], [0.6, 0.9] ],
        [ [0.2, 0.3], [0.2, 0.4], [0, 0], [0.4, 0.6], [0.45, 0.6],
            [0.5, 0.6], [0.55, 0.6], [0.6, 0.6], [0.65, 0.6], [0.7, 0.6],
            [0.65, 0.4], [0.6, 0.4], [0.5, 0.3], [0.4, 0.3], [0.3, 0.3],
            [0.6, 0.9], [0.5, 0.9], [0, 0], [0.1, 0.4], [0.1, 0.4],
            [0.1, 0.4], [0.1, 0.4], [0.1, 0.4], [0.2, 0.8], [0, 0],
            [0, 0], [0, 0], [0.3, 0.8], [0.3, 0.9], [0.35, 0.9],
            [0.4, 0.9], [0.4, 0.8] ],
        [ [0.2, 0.2], [0.2, 0.2], [0, 0], [0.4, 0.6], [0.5, 0.6],
            [0.55, 0.6], [0.6, 0.6], [0.65, 0.6], [0.7, 0.6], [0, 0],
            [0, 0], [0.65, 0.4], [0.6, 0.4], [0.5, 0.3], [0.45, 0.3],
            [0.4, 0.3], [0.35, 0.3], [0.65, 0.9], [0.55, 0.9], [0.2, 0.4] ],
        [ [0.2, 0.3], [0.2, 0.3], [0.2, 0.3], [0.4, 0.6], [0.5, 0.6],
            [0.55, 0.6], [0.6, 0.6], [0.65, 0.6], [0.7, 0.6], [0.65, 0.4],
            [0.55, 0.4], [0.6, 0.3], [0.55, 0.3], [0.5, 0.3], [0.4, 0.3],
            [0.3, 0.3] ],
        [ [0, 0], [0.445, 0.39], [0.55, 0.5], [0.54, 0.46], [0, 0],
            [0.5, 0.5] ],
        [ [0.48, 0.44] ]
    ],

    빛솔재A동: [
        [ [0.7, 0.4] ],
        [ [0, 0], [0, 0], [0.2, 0.5], [0.1, 0.5], [0.1, 0.7],
            [0.4, 0.7], [0.5, 0.7], [0.6, 0.7], [0.6, 0.3] ],
        [ [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
            [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
            [0, 0], [0, 0], [0, 0], [0.1, 0.5], [0.2, 0.5],
            [0.25, 0.5], [0.3, 0.5], [0.5, 0.4], [0.4, 0.5], [0.6, 0.3],
            [0.6, 0.6], [0, 0], [0, 0] ],
        [ [] ],
        [ [] ],
        [ [] ],
        [ [] ],
        [ [] ],
        [ [] ],
        [ [] ]
    ],

    빛솔재B동: [],

    새빛관: [
        [ [0.75, 0.3], [0.8, 0.7], [0.58, 0.68], [0.12, 0.63], [0.12, 0.3] ],
        [ [0.8, 0.55], [0.49, 0.34], [0.28, 0.6], [0.17, 0.55], [0.28, 0.15],
            [0.17, 0.1], [0.5, 0.62] ],
        [ [0.29, 0.35], [0.42, 0.3], [0.53, 0.25], [0.65, 0.2], [0.65, 0.61],
            [0.29, 0.45], [0.5, 0.61] ],
        [ [0.29, 0.61], [0.29, 0.32], [0.29, 0.15], [0.42, 0.18], [0.66, 0.22],
            [0.66, 0.26], [0.66, 0.3], [0.66, 0.35], [0.55, 0.25], [0.55, -0.12]],
        [ [0.42, 0.35], [0.53, 0.3], [0.66, 0.14], [0.66, 0.18], [0.66, 0.23],
            [0.66, 0.27], [0.66, 0.31], [0.66, 0.36], [0.27, 0.22], [0.27, 0.22],
            [0.27, 0.22], [0.27, 0.22], [0.28, 0.2], [0.28, 0.25] ],
        [ [0.27, 0.3], [0.33, 0.25], [0.39, 0.2], [0.45, 0.15], [0.5, 0.1],
            [0.56, 0.05], [0.62, 0], [0.68, -0.05], [0.66, 0.11], [0.66, 0.15],
            [0.66, 0.2], [0.27, -0.04], [0.27, 0.0], [0.27, 0.05], [0.41, -0.23],
            [0.52, -0.28] ],
        [ [0.27, 0.3], [0.33, 0.25], [0.39, 0.2], [0.45, 0.15], [0.5, 0.1],
            [0.56, 0.05], [0.62, 0], [0.68, -0.05], [0.66, 0.11], [0.66, 0.15],
            [0.66, 0.2], [0.27, -0.04], [0.27, 0.0], [0.27, 0.05], [0.41, -0.23],
            [0.52, -0.28] ],
        [ [0.27, 0.3], [0.33, 0.25], [0.39, 0.2], [0.45, 0.15], [0.5, 0.1],
            [0.56, 0.05], [0.62, 0], [0.68, -0.05], [0.66, 0.11], [0.66, 0.15],
            [0.66, 0.2], [0.27, -0.04], [0.27, 0.0], [0.27, 0.05], [0.41, -0.23],
            [0.52, -0.28] ],
        [ [0.27, 0.3], [0.33, 0.25], [0.39, 0.2], [0.45, 0.15], [0.5, 0.1],
            [0.56, 0.05], [0.62, 0], [0.68, -0.05], [0.66, 0.11], [0.66, 0.15],
            [0.66, 0.2], [0.27, -0.04], [0.27, 0.0], [0.27, 0.05], [0.41, -0.23],
            [0.52, -0.28] ]
    ],

// --------------------------------------------------------------------------------------------

    아이스링크: [],

    연구문화관: [
        [ [0.53, 0.15], [0.46, 0.06], [0.36, 0.03], [0.35, 0.06], [0.34, 0.13],
            [0.33, 0.2], [0.37, 0.29], [0, 0], [0.52, 0.8], [0.5, 0.25],
            [0.5, 0.1], [0.5, 0.45], [0.435, 0.42], [0.395, 0.34], [0.36, 0.32],
            [0.3, 0.25], [0.3, 0.07], [0.29, 0.0], [0, 0], [0, 0],
            [0, 0], [0.5, -0.2] ],
        [ [0.66, 0.25], [0.61, 0.17], [0, 0], [0.57, 0.095], [0.535, 0.02],
            [0.49, -0.045], [0.35, 0], [0.3, -0.05], [0.25, -0.1], [0.36, -0.25],
            [0.34, 0.02], [0.37, 0.29] ],
        [ [0.1, 0.2], [0.2, 0.1], [0.4, 0.2], [0.45, 0.3], [0.5, 0.3],
            [0.6, 0.4], [0.6, 0.4], [0.5, 0.4], [0.45, 0.4], [0.5, 0.4],
            [0.6, 0.5], [0.65, 0.6], [0.6, 0.6], [0.6, 0.7], [0, 0],
            [0.65, 0.8], [0.6, 0.8], [0.7, 0.8], [0.7, 0.7], [0.7, 0.6],
            [0.7, 0.5] ],
        [ [0.1, 0.2], [0.3, 0.2], [0.35, 0.2], [0.4, 0.2], [0.6, 0.4] ],
        [ [0.1, 0.2], [0.15, 0.2], [0.2, 0.3], [0.3, 0.2], [0.35, 0.2],
            [0.4, 0.3], [0.6, 0.4] ],
        [ [0.15, 0.2], [0.2, 0.3], [0, 0], [0.25, 0.2], [0.3, 0.2],
            [0.4, 0.2], [0.45, 0.2], [0.4, 0.3] ],
        [ [0.2, 0.5], [0.3, 0.6], [0.45, 0.7], [0.5, 0.4], [0.6, 0.5],
            [0.8, 0.7] ],
        [ [0.2, 0.6], [0, 0], [0.4, 0.7], [0.45, 0.4], [0.5, 0.4],
            [0.6, 0.5], [0.7, 0.5] ],
        [ [0.2, 0.6], [0.4, 0.7], [0.45, 0.7], [0.5, 0.4] ],
        [ [0.2, 0.5], [0.3, 0.6], [0.4, 0.7], [0.5, 0.5], [0.4, 0.4] ],
        [ [0.2, 0.5], [0.3, 0.6], [0.4, 0.7], [0.5, 0.4] ],
        [ [0.2, 0.5], [0.3, 0.6], [0.4, 0.7], [0.5, 0.4] ]
    ],

    연촌재: [],

    옥의관: [
        [ [0.6, 0.3], [0.1, 0.5], [0.75, 0.4], [0.8, 0.5], [0.9, 0.2] ],
        [ [0.15, 0.3], [0.4, 0.3], [0.6, 0.3], [0.7, 0.3] ],
        [ [0.2, 0.3], [0, 0], [0.3, 0.3], [0.4, 0.3], [0.5, 0.3],
            [0.7, 0.3], [0.9, 0.5], [0.8, 0.5], [0.6, 0.5], [0.4, 0.5],
            [0.2, 0.5] ],
        [ [0.2, 0.2], [0.4, 0.2], [0.6, 0.2], [0.9, 0.4], [0.8, 0.4] ],
        [ [0.2, 0.2], [0.3, 0.2], [0.4, 0.2], [0, 0], [0.5, 0.2],
            [0.6, 0.2], [0.7, 0.2], [0.9, 0.2], [0.9, 0.4], [0.8, 0.4],
            [0.7, 0.4], [0.6, 0.4], [0.5, 0.4], [0.4, 0.4], [0.3, 0.4] ],
        [ [0.2, 0.2], [0.25, 0.2], [0.3, 0.2], [0.4, 0.2], [0.5, 0.2],
            [0.6, 0.2], [0.7, 0.2], [0.9, 0.4], [0, 0], [0.8, 0.4],
            [0.7, 0.4], [0.6, 0.4], [0.5, 0.4], [0.4, 0.4], [0.3, 0.4] ],
        [ [0.2, 0.2], [0.25, 0.2], [0.4, 0.2], [0.5, 0.2], [0.6, 0.2],
            [0.7, 0.2], [0.9, 0.2], [0.9, 0.4], [0.7, 0.4], [0.6, 0.4],
            [0.5, 0.4], [0.4, 0.4], [0.3, 0.4] ],
        [ [0.2, 0.2], [0.3, 0.2], [0.4, 0.2], [0.5, 0.2], [0.6, 0.2],
            [0.7, 0.2], [0.9, 0.4], [0.8, 0.4], [0.7, 0.4], [0.6, 0.4],
            [0.5, 0.4], [0.4, 0.4], [0.3, 0.4] ],
        [ [0.1, 0.2], [0.2, 0.2], [0.3, 0.2], [0.4, 0.2], [0.5, 0.2],
            [0.6, 0.2], [0.7, 0.2], [0.8, 0.2], [0.8, 0.3], [0.8, 0.4],
            [0.6, 0.4], [0.4, 0.4], [0.3, 0.4], [0.25, 0.4] ]
    ],

    인터내셔널하우스: [
        [ [0.1, 0.5], [0.3, 0.5], [0.6, 0.5], [0.8, 0.5] ],
        [ [0.1, 0.5], [0.3, 0.5], [0.6, 0.5], [0.8, 0.5] ],
        [ [0.1, 0.5], [0.3, 0.5], [0.6, 0.5], [0.8, 0.5] ],
        [ [0.1, 0.5], [0.3, 0.5], [0.6, 0.5], [0.8, 0.5] ]
    ],

    참빛관: [
        [ [0, 0], [0.5, 0.8], [0.8, 0.6], [0.9, 0.8], [0.7, 0.6],
            [0.3, 0.7], [0.1, 0.7], [0.8, 0.3], [0, 0], [0, 0],
            [0, 0], [0.4, 0.7], [0.2, 0.3], [0.1, 0.6], [0.3, 0.6],
            [0.3, 0.2], [0.5, 0.3], [0.6, 0.3] ],
        [ [0.2, 0.4], [0.7, 0.5], [0.1, 0.1], [0.7, 0.1], [0.7, 0.3],
            [0.9, 0.3] ],
        [ [0.7, 0.6], [0.9, 0.3], [0.7, 0.3], [0.6, 0.1], [0.3, 0.2],
            [0.1, 0.2], [0.1, 0.5], [0.5, 0.8] ],
        [ [0.7, 0.6], [0.8, 0.3], [0.6, 0.3], [0.5, 0.3], [0.7, 0.8] ],
        [ [0.7, 0.6], [0.8, 0.3], [0.6, 0.3], [0.5, 0.3], [0.7, 0.8] ],
        [ [0.9, 0.3], [0.8, 0.3], [0.75, 0.3], [0.7, 0.3], [0.65, 0.3],
            [0.6, 0.3], [0.5, 0.3], [0.4, 0.4], [0.4, 0.5], [0.4, 0.7],
            [0.55, 0.8], [0.6, 0.8], [0.7, 0.8] ],
        [ [0.9, 0.3], [0.8, 0.3], [0.75, 0.3], [0.7, 0.3], [0.65, 0.3],
            [0.6, 0.3], [0.5, 0.3], [0.4, 0.4], [0.4, 0.5], [0.4, 0.7],
            [0.55, 0.8], [0.6, 0.8], [0.7, 0.8] ],
        [ [0.9, 0.3], [0.8, 0.3], [0.75, 0.3], [0.7, 0.3], [0.65, 0.3],
            [0.6, 0.3], [0.5, 0.3], [0.4, 0.4], [0.4, 0.5], [0.4, 0.7],
            [0.55, 0.8], [0.6, 0.8], [0.7, 0.8] ],
        [ [0.9, 0.3], [0.8, 0.3], [0.75, 0.3], [0.7, 0.3], [0.65, 0.3],
            [0.6, 0.3], [0.5, 0.3], [0.4, 0.4], [0.4, 0.5], [0.4, 0.7],
            [0.55, 0.8], [0.6, 0.8], [0.7, 0.8], [0.8, 0.8] ],
        [ [0.9, 0.3], [0.8, 0.3], [0.75, 0.3], [0.7, 0.3], [0.65, 0.3],
            [0.6, 0.3], [0.5, 0.3], [0.4, 0.4], [0.4, 0.5], [0.4, 0.7],
            [0.55, 0.8], [0.6, 0.8], [0.7, 0.8] ],
        [ [0.9, 0.3], [0.8, 0.3], [0.75, 0.3], [0.7, 0.3], [0.65, 0.3],
            [0.6, 0.3], [0.5, 0.3], [0.4, 0.4], [0.4, 0.5], [0.4, 0.7],
            [0.55, 0.8], [0.6, 0.8], [0.7, 0.8] ],
        [ [0.9, 0.3], [0.8, 0.3], [0.75, 0.3], [0.7, 0.3], [0.65, 0.3],
            [0.6, 0.3], [0.5, 0.3], [0.4, 0.4], [0.4, 0.5], [0.4, 0.7],
            [0.55, 0.8], [0.6, 0.8], [0.7, 0.8] ],
        [ [0.9, 0.3], [0.8, 0.3], [0.75, 0.3], [0.7, 0.3], [0.65, 0.3],
            [0.6, 0.3], [0.5, 0.3], [0.4, 0.3], [0.4, 0.5], [0.4, 0.7],
            [0.5, 0.8], [0.6, 0.8], [0.7, 0.8] ]
    ],

    한울관: [
        [ [0.35, 0.4] ],
        [ [0.35, 0.4], [0, 0], [0.6, 0.1], [0.8, 0.9] ],
        [ [0.6, 0.3], [0.4, 0.3], [0.2, 0.3], [0.1, 0.3], [0.05, 0.9],
            [0.1, 0.9], [0.15, 0.9], [0.2, 0.9], [0.25, 0.9], [0.3, 0.7],
            [0.4, 0.7], [0.45, 0.7], [0.5, 0.7], [0.55, 0.7], [0.6, 0.7],
            [0.7, 0.1], [0.7, 0.1], [0.7, 0.1], [0.7, 0.1], [0.7, 0.1],
            [0.7, 0.1] ],
        [ [0.3, 0.2], [0.1, 0.2], [0.1, 0.4], [0.1, 0.9], [0.3, 0.9],
            [0.35, 0.9], [0.4, 0.9], [0.45, 0.9], [0.5, 0.9], [0.6, 0.9],
            [0.7, 0.9], [0.9, 0.9], [0.65, 0.6], [0.6, 0.6], [0.5, 0.6],
            [0.45, 0.6], [0.4, 0.6], [0.35, 0.6] ],
        [ [0.3, 0.4], [0.3, 0.2], [0.1, 0.2], [0.1, 0.4], [0.05, 0.9],
            [0.1, 0.9], [0.2, 0.9], [0.25, 0.9], [0.3, 0.9], [0.4, 0.9],
            [0.45, 0.9], [0.5, 0.9], [0.55, 0.9], [0.7, 0.9], [0.85, 0.9],
            [0.9, 0.9], [0.9, 0.7], [0.85, 0.7], [0.8, 0.7], [0.65, 0.7],
            [0.6, 0.7], [0.5, 0.7], [0.45, 0.7], [0.4, 0.7], [0.35, 0.7] ],
        [ [0.3, 0.4], [0.3, 0.2], [0.1, 0.2], [0.1, 0.4], [0.1, 0.9],
            [0.3, 0.8], [0.4, 0.7], [0.5, 0.7], [0.6, 0.7], [0.9, 0.8],
            [0.9, 0.7] ],
        [ [0.3, 0.4], [0.3, 0.2], [0.1, 0.2], [0.1, 0.4], [0.1, 0.9],
            [0.3, 0.8], [0.4, 0.7], [0.5, 0.7], [0.6, 0.7], [0.9, 0.8],
            [0.9, 0.7] ],
        [ [0.3, 0.4], [0.3, 0.2], [0.1, 0.2], [0.1, 0.4], [0.1, 0.8],
            [0.1, 0.8], [0.1, 0.8], [0.2, 0.9], [0.25, 0.9], [0.3, 0.9],
            [0.4, 0.9], [0.45, 0.9], [0.5, 0.9], [0.55, 0.9], [0.6, 0.9],
            [0.7, 0.9], [0.75, 0.9], [0.8, 0.9], [0.85, 0.9], [0.85, 0.7],
            [0.8, 0.7], [0.75, 0.7], [0.6, 0.7], [0.55, 0.7], [0.5, 0.7],
            [0.45, 0.7], [0.4, 0.7] ],
        [ [0.3, 0.1], [0.3, 0.1], [0.3, 0.1], [0.3, 0.1], [0.3, 0.1],
            [0.1, 0.1], [0.1, 0.1], [0.1, 0.1], [0.1, 0.1], [0.1, 0.1],
            [0.1, 0.1], [0.1, 0.7], [0.1, 0.7], [0.1, 0.7], [0.2, 0.9],
            [0.25, 0.9], [0.3, 0.9], [0.4, 0.9], [0.45, 0.9], [0.5, 0.9],
            [0.55, 0.9], [0.65, 0.9], [0.7, 0.9], [0.75, 0.9], [0.9, 0.8],
            [0.9, 0.8], [0.9, 0.6], [0.9, 0.6], [0.75, 0.6], [0.65, 0.6],
            [0.55, 0.6], [0.5, 0.6], [0.45, 0.6], [0.4, 0.6], [0.35, 0.6] ],
        [ [0.3, 0.1], [0.3, 0.1], [0.3, 0.1], [0.3, 0.1], [0.3, 0.1],
            [0.1, 0.1], [0.1, 0.1], [0.1, 0.1], [0.1, 0.1], [0.1, 0.1],
            [0.1, 0.1], [0.1, 0.7], [0.1, 0.7], [0.1, 0.7], [0.2, 0.9],
            [0.25, 0.9], [0.3, 0.9], [0.4, 0.9], [0.45, 0.9], [0.5, 0.9],
            [0.55, 0.9], [0.65, 0.9], [0.7, 0.9], [0.75, 0.9], [0.9, 0.8],
            [0.9, 0.8], [0.9, 0.6], [0.9, 0.6], [0.75, 0.6], [0.65, 0.6],
            [0.55, 0.6], [0.5, 0.6], [0.45, 0.6], [0.4, 0.6], [0.35, 0.6] ]
    ],

    한천재: [
        [ [0.7, 0.6], [0.3, 0.8], [0.2, 0.2] ],
        [ [0.4, 0.5], [0.6, 0.5], [0.7, 0.5], [0.9, 0.5] ],
        [ [0.4, 0.5], [0.6, 0.5], [0.7, 0.5], [0.9, 0.5] ],
        [ [0.4, 0.5], [0.6, 0.5], [0.7, 0.5], [0.9, 0.5] ],
        [ [0.4, 0.5], [0.6, 0.5], [0.7, 0.5], [0.9, 0.5] ]
    ],

    화도관: [
        [ [0.4, 0.7], [0.55, 0.7], [0.65, 0.7], [0, 0], [0, 0],
            [0.5, 0.5], [0.6, 0.5], [0, 0], [0, 0], [0, 0],
            [0.45, 0.5], [0.45, 0.4], [0.4, 0.3] ],
        [ [0.4, 0.4], [0.3, 0.4], [0.2, 0.4], [0.1, 0.4], [0, 0.4],
            [0, 0.3], [0.2, 0.3], [0.3, 0.3], [0.5, 0.3], [0, 0],
            [0.7, 0.3], [0.8, 0.3], [1, 0.3], [0, 0], [1, 0.4],
            [0.8, 0.4], [0.7, 0.4], [0.6, 0.4], [0.65, 0.4], [0.9, 0.2] ],
        [ [0.9, 0.4], [0.4, 0.5], [0.3, 0.5], [0.25, 0.5], [0.2, 0.5],
            [0.1, 0.5], [0.2, 0.4], [0.3, 0.4], [0.4, 0.4], [0.5, 0.4],
            [0.8, 0.5], [0.7, 0.5], [0.6, 0.5] ],
        [ [0.3, 0.5], [0.2, 0.5], [0.1, 0.5], [0, 0.4], [0.15, 0.4],
            [0.3, 0.4], [0.4, 0.4], [0.5, 0.4], [0.7, 0.5], [0.8, 0.5],
            [0.9, 0.4], [0.85, 0.5], [0.8, 0.5], [0.7, 0.5], [0.6, 0.5],
            [0.4, 0.5] ],
        [ [0, 0.4], [0.05, 0.4], [0, 0.5], [0.2, 0.4], [0.4, 0.4],
            [0.5, 0.4], [0.55, 0.4], [0.6, 0.4], [0.7, 0.4], [0.8, 0.4],
            [0.9, 0.5], [0.85, 0.5], [0.8, 0.5], [0.78, 0.5], [0.7, 0.5],
            [0.5, 0.5], [0.4, 0.5] ],
        [ [0.3, 0.5], [0.3, 0.6], [0.25, 0.6], [0.2, 0.5], [0.2, 0.6],
            [0.18, 0.6], [0.15, 0.6], [0.1, 0.6], [0.1, 0.4], [0.2, 0.4],
            [0.25, 0.4], [0.28, 0.4], [0.3, 0.4], [0.4, 0.4], [0.45, 0.4],
            [0.5, 0.4], [0.55, 0.4], [0.7, 0.4], [0.8, 0.4], [0.8, 0.6],
            [0.7, 0.6], [0.5, 0.6] ],
        [ [0.3, 0.5], [0.3, 0.6], [0.25, 0.6], [0.2, 0.5], [0.2, 0.6],
            [0.18, 0.6], [0.15, 0.6], [0.1, 0.6], [0.15, 0.4], [0.2, 0.4],
            [0.25, 0.4], [0.28, 0.4], [0.3, 0.4], [0.4, 0.4], [0.45, 0.4],
            [0.48, 0.4], [0.5, 0.4], [0.55, 0.4], [0.6, 0.4], [0.68, 0.4],
            [0.7, 0.4], [0.75, 0.4], [0.8, 0.4], [0.85, 0.4], [0.85, 0.6],
            [0.8, 0.5], [0.85, 0.6], [0.8, 0.6], [0.7, 0.5], [0.75, 0.6],
            [0.7, 0.6], [0.68, 0.6], [0.6, 0.55], [0.65, 0.6], [0.6, 0.6],
            [0.55, 0.6], [0.4, 0.55], [0.45, 0.6], [0.4, 0.6], [0.35, 0.6],
            [0.4, 0.5] ]
    ]

};

export { position }