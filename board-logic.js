const BOARD_DATA_KEY = 'adbc_board_data';

const initialBoardData = [
    {
        id: 1,
        type: 'notice',
        isPinned: true,
        title: '[공지] 자율주행 빅데이터 관제센터 시스템 정기 점검 안내',
        writer: '관리자',
        date: '2026-04-05',
        views: 124,
        content: '안녕하세요. 자율주행 빅데이터 관제센터입니다. 보다 안정적인 서비스 제공을 위해 정기 점검을 실시할 예정입니다. 점검 시간에는 서비스 이용이 일시 중단되오니 양해 부탁드립니다.\n\n[점검 일시]\n2026년 4월 15일(수) 22:00 ~ 4월 16일(목) 06:00 (약 8시간)\n\n[점검 내용]\n- 서버 고도화 및 DB 최적화\n- 실시간 관제 연동 모듈 업데이트\n\n이용에 불편을 드려 죄송합니다.',
        files: [{ name: '점검안내_세부내용.pdf', size: '1.2MB' }]
    },
    {
        id: 2,
        type: 'notice',
        isPinned: true,
        title: '[공지] 2026년 상반기 기업 지원 데이터 분석 패키지 모집',
        writer: '운영국',
        date: '2026-04-01',
        views: 342,
        content: '신규 기업 지원을 위한 데이터 분석 패키지 참여 기업을 모집합니다. 본 패키지는 자율주행 기술 개발 기업을 대상으로 하며, 센터 내 전문 분석 장비 및 고품질 원시 데이터를 무료로 활용할 수 있는 기회를 제공합니다.\n\n신청 기간: 2026.04.01 ~ 2026.04.30\n신청 방법: 플랫폼 내 인프라 예약 시스템을 통해 신청',
        files: [{ name: '모집공고문.zip', size: '5.6MB' }]
    },
    {
        id: 3,
        type: 'notice',
        isPinned: false,
        title: '신규 자율주행 실증 단지 확장 안내',
        writer: '관리자',
        date: '2026-03-25',
        views: 89,
        content: '세종시 내 자율주행 실증 대상 구역이 기존 4단계에서 5단계로 확대되었습니다. 새롭게 추가된 스마트 산단 주변 도로의 맵 데이터 및 인프라 정보를 업데이트 하였으니 참고하시기 바랍니다.',
        files: []
    },
    {
        id: 4,
        type: 'notice',
        isPinned: false,
        title: '자율주행 데이터 보안 가이드라인 배포',
        writer: '기술팀',
        date: '2026-03-20',
        views: 156,
        content: '자율주행 데이터 수집 및 처리 단계에서 개인정보보호와 데이터 보안을 강화하기 위한 최신 가이드라인이 배포되었습니다. 모든 협력 기관 및 기업 담당자께서는 해당 내용을 숙지하여 주시기 바랍니다.',
        files: [{ name: '보안가이드라인_v2.1.pdf', size: '2.4MB' }]
    },
    {
        id: 5,
        type: 'notice',
        isPinned: false,
        title: '관제 플랫폼 사용자 매뉴얼 업데이트 (v1.5)',
        writer: '시스템팀',
        date: '2026-03-10',
        views: 210,
        content: '로그인 방식 변경 및 데이터 시각화 툴 업데이트에 따른 사용자 매뉴얼 최신 버전을 배포합니다.',
        files: [{ name: '사용자매뉴얼_v1.5.pdf', size: '4.8MB' }]
    }
];

function initBoardStorage() {
    if (!localStorage.getItem(BOARD_DATA_KEY)) {
        localStorage.setItem(BOARD_DATA_KEY, JSON.stringify(initialBoardData));
    }
}

function getBoardData() {
    initBoardStorage();
    return JSON.parse(localStorage.getItem(BOARD_DATA_KEY)) || [];
}

function saveBoardData(data) {
    localStorage.setItem(BOARD_DATA_KEY, JSON.stringify(data));
}

function getPostById(id) {
    const data = getBoardData();
    return data.find(post => post.id == id);
}

function incrementViews(id) {
    let data = getBoardData();
    const index = data.findIndex(p => p.id == id);
    if (index !== -1) {
        data[index].views += 1;
        saveBoardData(data);
    }
}

// Global initialization
initBoardStorage();
