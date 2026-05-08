import React, { useState } from 'react';
import {
    Home,
    ShoppingCart,
    ChefHat,
    Utensils,
    CheckCircle2,
    Circle,
    Plus,
    Trash2,
    ListChecks,
    ChevronDown,
    ChevronRight,
    ChevronsDown,
    ChevronsUp,
    Archive,
    X,
    PackageCheck
} from 'lucide-react';

// --- 6인 기준 요리별 재료 데이터 (준비/조리 탭 렌더링용) ---
const recipesData = [
    {
        name: '샹그리아 (웰컴 드링크)',
        ingredients: '와인 2병, 피치트리, 시나노골드사과, 오렌지, 레몬, 유자청, 오렌지주스, 탄산수, 사이다, 시나몬 스틱, 얼음 듬뿍'
    },
    {
        name: '샐러드 파스타',
        ingredients: '푸실리/스파게티면 400g, 샐러드 채소 믹스 300g, 방울토마토 20알, 블랙올리브, 오리엔탈 드레싱 1병, 파마산 치즈가루'
    },
    {
        name: '홍소육 (메인)',
        ingredients: '듀록 오겹살 4kg, 쪽파 1단, 생강 2톨, 소주 2병 (기본 양념: 간장, 설탕/빙당, 물 등)'
    },
    {
        name: '파기름국수 (식사)',
        ingredients: '중면 600g, 식용유 넉넉히 (파기름용), 쪽파 1/2단 (기본 양념: 간장, 설탕 등)'
    },
    {
        name: '홍합탕',
        ingredients: '홍합 1.5kg ~ 2kg, 청양고추 3개, 홍고추 1개, 대파 1대, 다진마늘, 소금, 후추'
    },
    {
        name: '부시리회',
        ingredients: '부시리회 (포장/배달) 약 800g, 생와사비, 회간장, 락교/초생강, 무순'
    },
    {
        name: '문어카르파쵸',
        ingredients: '자숙 문어 다리 400g, 양파 1/2개, 레몬 1/2개, 엑스트라버진 올리브오일, 케이퍼, 딜(허브)'
    },
    {
        name: '나쵸 & 디핑소스',
        ingredients: '나쵸 칩 대용량 1봉, 살사 소스 1병, 치즈 소스'
    }
];

// --- 초기 전체 데이터 ---
const initialData = {
    chores: [
        { id: 'c1', text: '[현관] 바닥 쓸고 닦기 및 슬리퍼 세팅', completed: false, area: '현관' },
        { id: 'c2', text: '[거실] 테이블 정리 및 환기, 돌돌이', completed: false, area: '거실' },
        { id: 'c3', text: '[주방] 싱크대 정리 (조리 공간 확보)', completed: false, area: '주방' },
        { id: 'c3_2', text: '[주방] 얼음 넉넉하게 추가로 얼려두기 및 보관하기', completed: false, area: '주방' },
        { id: 'c4', text: '[미디어룸] 손님용 이불보/베개 커버 교체', completed: false, area: '미디어룸' },
        { id: 'c5', text: '[화장실] 물기 제거 및 새 수건 비치', completed: false, area: '외부 화장실' },
    ],
    // ingredients의 status는 'to_buy' (장볼것) 또는 'stored' (보관함)
    ingredients: [
        { id: 'i1', text: '듀록 오겹살 4kg', status: 'to_buy' },
        { id: 'i2', text: '홍합 1.5~2kg', status: 'to_buy' },
        { id: 'i3', text: '자숙 문어 다리 (약 400g)', status: 'to_buy' },
        { id: 'i4', text: '부시리회 약 800g (미리 예약/포장)', status: 'to_buy' },
        { id: 'i5', text: '중면 600g', status: 'to_buy' },
        { id: 'i5_2', text: '푸실리 면 400g', status: 'to_buy' },
        { id: 'i6', text: '쪽파 2단', status: 'to_buy' },
        { id: 'i6_2', text: '대파 1대', status: 'to_buy' },
        { id: 'i6_3', text: '양파 1개', status: 'to_buy' },
        { id: 'i7', text: '생강 2톨', status: 'to_buy' },
        { id: 'i7_2', text: '통마늘', status: 'to_buy' },
        { id: 'i7_3', text: '다진마늘', status: 'to_buy' },
        { id: 'i7_4', text: '청양고추', status: 'to_buy' },
        { id: 'i7_5', text: '홍고추', status: 'to_buy' },
        { id: 'i8', text: '샐러드 채소 300g', status: 'to_buy' },
        { id: 'i8_2', text: '방울토마토 1팩', status: 'to_buy' },
        { id: 'i9', text: '시나노골드사과', status: 'to_buy' },
        { id: 'i9_2', text: '오렌지', status: 'to_buy' },
        { id: 'i9_3', text: '레몬 2개', status: 'to_buy' },
        { id: 'i10', text: '와인 2병', status: 'to_buy' },
        { id: 'i10_2', text: '피치트리', status: 'to_buy' },
        { id: 'i11', text: '소주 2병', status: 'to_buy' },
        { id: 'i11_2', text: '그 외 주류', status: 'to_buy' },
        { id: 'i12', text: '유자청', status: 'to_buy' },
        { id: 'i12_2', text: '오렌지주스', status: 'to_buy' },
        { id: 'i12_3', text: '탄산수', status: 'to_buy' },
        { id: 'i12_4', text: '사이다', status: 'to_buy' },
        { id: 'i12_5', text: '시나몬 스틱', status: 'to_buy' },
        { id: 'i13', text: '파는 얼음 (넉넉히)', status: 'to_buy' },
        { id: 'i14', text: '식용유', status: 'to_buy' },
        { id: 'i14_2', text: '올리브오일', status: 'to_buy' },
        { id: 'i14_3', text: '오리엔탈 드레싱', status: 'to_buy' },
        { id: 'i15', text: '케이퍼', status: 'to_buy' },
        { id: 'i15_2', text: '딜 (허브)', status: 'to_buy' },
        { id: 'i15_3', text: '나쵸 대용량 1봉', status: 'to_buy' },
        { id: 'i15_4', text: '살사 소스', status: 'to_buy' },
        { id: 'i15_5', text: '치즈 소스', status: 'to_buy' },
    ],
    cookingSteps: [
        { id: 'p1', text: '[D-1] 홍소육 미리 조리해두기 (오겹살 4kg이므로 시간이 오래 걸림)', completed: false },
        { id: 'p2', text: '[D-1] 샹그리아 베이스 숙성 (과일 썰기 + 와인 + 피치트리 + 유자청 + 오렌지주스 + 시나몬 스틱 섞어 냉장)', completed: false },
        { id: 'p3', text: '[D-1] 문어카르파쵸용 문어 살짝 얼려두기 (썰기 편함)', completed: false },
        { id: 'p4', text: '[D-Day 4시간 전] 홍합 해감 및 깨끗이 씻어두기', completed: false },
        { id: 'p5', text: '[D-Day 4시간 전] 모든 채소(샐러드, 파기름용 쪽파 등) 씻어서 물기 빼기', completed: false },
        { id: 'p6', text: '[D-Day 2시간 전] 파기름국수용 파기름 미리 넉넉히 내어두기', completed: false },
        { id: 'p7', text: '[D-Day 2시간 전] 문어 얇게 슬라이스하여 접시에 세팅 후 랩 씌워 냉장보관', completed: false },
        { id: 'p8', text: '[D-Day 1시간 전] 샐러드 파스타 면 삶고 찬물에 헹궈 오일 코팅해두기', completed: false },
        { id: 'p9', text: '[손님 도착 30분 전] 홍소육 데우기 시작, 홍합탕 끓이기', completed: false },
        { id: 'p10', text: '[손님 도착 직전] 샹그리아에 탄산수/사이다 섞고 얼음 넣어 세팅', completed: false },
        { id: 'p11', text: '[손님 도착 직전] 샐러드 파스타 채소와 버무려 접시 세팅', completed: false },
    ],
    serving: [
        { id: 's1', text: '[도착 직후] 웰컴 드링크 (시원한 샹그리아) 서빙 및 건배', completed: false },
        { id: 's2', text: '[코스 1 - 애피타이저] 문어 카르파쵸 & 샐러드 파스타 서빙', completed: false },
        { id: 's3', text: '[코스 2 - 해산물] 부시리회 & 시원한 홍합탕 서빙', completed: false },
        { id: 's4', text: '[코스 3 - 메인] 따뜻하게 데운 홍소육 서빙', completed: false },
        { id: 's5', text: '[코스 4 - 식사] 파기름국수 중면 삶아서 소스와 비벼 내어주기', completed: false },
        { id: 's6', text: '[코스 5 - 안주/마무리] 테이블 정리 후 나쵸 & 디핑소스, 남은 주류 세팅', completed: false },
    ]
};

const AREAS = ['현관', '거실', '주방', '안방', '미디어룸', '드레스룸', '안방 화장실', '외부 화장실', '기타'];

export default function App() {
    const [tasks, setTasks] = useState(initialData);
    const [activeTab, setActiveTab] = useState('ingredients');
    const [newItemText, setNewItemText] = useState('');
    const [newItemArea, setNewItemArea] = useState('기타');

    // 모달 및 아코디언 상태
    const [isStorageModalOpen, setIsStorageModalOpen] = useState(false);
    const [expandedAreas, setExpandedAreas] = useState(
        AREAS.reduce((acc, area) => ({ ...acc, [area]: true }), {})
    );
    // 요리 레시피 아코디언 상태
    const [isRecipesExpanded, setIsRecipesExpanded] = useState(true);

    // 파생 데이터
    const toBuyList = tasks.ingredients.filter(i => i.status === 'to_buy');
    const storedList = tasks.ingredients.filter(i => i.status === 'stored');

    const calculateOverallProgress = () => {
        let total = tasks.chores.length + tasks.cookingSteps.length + tasks.serving.length;
        let completed =
            tasks.chores.filter(i => i.completed).length +
            tasks.cookingSteps.filter(i => i.completed).length +
            tasks.serving.filter(i => i.completed).length;
        return total === 0 ? 0 : Math.round((completed / total) * 100);
    };

    // 일반 태스크 토글 (집안일, 조리, 서빙)
    const toggleTask = (category, id) => {
        setTasks(prev => ({
            ...prev,
            [category]: prev[category].map(item =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        }));
    };

    // 식재료 구매/보관 상태 변경
    const toggleIngredientStatus = (id) => {
        setTasks(prev => ({
            ...prev,
            ingredients: prev.ingredients.map(item => {
                if (item.id === id) {
                    return { ...item, status: item.status === 'to_buy' ? 'stored' : 'to_buy' };
                }
                return item;
            })
        }));
    };

    const deleteTask = (category, id) => {
        setTasks(prev => ({
            ...prev,
            [category]: prev[category].filter(item => item.id !== id)
        }));
    };

    const addTask = (e) => {
        e.preventDefault();
        if (!newItemText.trim()) return;

        if (activeTab === 'ingredients') {
            const newTask = {
                id: Date.now().toString(),
                text: newItemText.trim(),
                status: 'to_buy'
            };
            setTasks(prev => ({ ...prev, ingredients: [...prev.ingredients, newTask] }));
        } else {
            let textPrefix = '';
            if (activeTab === 'chores' && newItemArea !== '기타') {
                textPrefix = `[${newItemArea}] `;
            }
            const targetCategory = activeTab === 'cooking' ? 'cookingSteps' : activeTab;

            const newTask = {
                id: Date.now().toString(),
                text: textPrefix + newItemText.trim(),
                completed: false,
                ...(activeTab === 'chores' && { area: newItemArea })
            };
            setTasks(prev => ({ ...prev, [targetCategory]: [...prev[targetCategory], newTask] }));

            if (activeTab === 'chores') {
                setExpandedAreas(prev => ({ ...prev, [newItemArea]: true }));
            }
        }
        setNewItemText('');
    };

    const tabs = [
        { id: 'chores', label: '집안일', icon: Home },
        { id: 'ingredients', label: '장보기', icon: ShoppingCart },
        { id: 'cooking', label: '조리/준비', icon: ChefHat },
        { id: 'serving', label: '코스서빙', icon: Utensils },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans sm:pb-8">
            {/* --- 모바일 뷰어용 컨테이너 --- */}
            <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg relative flex flex-col">

                {/* 헤더 */}
                <header className="bg-white pt-6 pb-4 px-5 sticky top-0 z-20 shadow-sm flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight flex items-center">
                            <ListChecks className="w-7 h-7 mr-2 text-orange-500" />
                            집들이 매니저
                        </h1>
                        <p className="text-xs text-gray-500 mt-1 font-medium">6인 코스 요리 에디션</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* 보관함 (냉장고) 버튼 */}
                        <button
                            onClick={() => setIsStorageModalOpen(true)}
                            className="relative p-2 text-slate-600 hover:text-orange-500 bg-slate-100 hover:bg-orange-50 rounded-full transition-colors"
                        >
                            <Archive className="w-6 h-6" />
                            {storedList.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                    {storedList.length}
                                </span>
                            )}
                        </button>
                        <div className="text-right ml-2 border-l border-gray-200 pl-3">
                            <div className="text-2xl font-black text-orange-500">{calculateOverallProgress()}%</div>
                            <div className="text-[10px] text-gray-400 font-medium uppercase">Overall</div>
                        </div>
                    </div>

                    {/* 전체 진행률 바 */}
                    <div className="absolute bottom-0 left-0 w-full bg-gray-100 h-1.5 overflow-hidden">
                        <div
                            className="bg-orange-500 h-1.5 transition-all duration-500 ease-out"
                            style={{ width: `${calculateOverallProgress()}%` }}
                        ></div>
                    </div>
                </header>

                {/* 탭 네비게이션 */}
                <nav className="flex overflow-x-auto hide-scrollbar border-b border-gray-100 bg-white sticky top-[84px] z-10">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 min-w-[80px] py-3 flex flex-col items-center justify-center transition-colors relative ${isActive ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                                <span className={`text-[11px] whitespace-nowrap ${isActive ? 'font-bold' : 'font-medium'}`}>
                                    {tab.label}
                                </span>
                                {isActive && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-t-full"></div>
                                )}
                            </button>
                        )
                    })}
                </nav>

                {/* 메인 콘텐츠 영역 */}
                <main className="flex-1 overflow-y-auto p-4 bg-slate-50/50 pb-32">

                    {/* 1. 집안일 탭 */}
                    {activeTab === 'chores' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4">
                            <div className="flex justify-end gap-2 mb-2">
                                <button onClick={() => setExpandedAreas(AREAS.reduce((acc, a) => ({ ...acc, [a]: true }), {}))} className="flex items-center text-[11px] text-gray-500 border border-gray-200 px-2 py-1 rounded-md bg-white">
                                    <ChevronsDown className="w-3.5 h-3.5 mr-1" /> 전체 펼치기
                                </button>
                                <button onClick={() => setExpandedAreas(AREAS.reduce((acc, a) => ({ ...acc, [a]: false }), {}))} className="flex items-center text-[11px] text-gray-500 border border-gray-200 px-2 py-1 rounded-md bg-white">
                                    <ChevronsUp className="w-3.5 h-3.5 mr-1" /> 전체 접기
                                </button>
                            </div>

                            {AREAS.map(area => {
                                const areaTasks = tasks.chores.filter(task => task.area === area || (!task.area && area === '기타'));
                                if (areaTasks.length === 0 && area !== '기타') return null;
                                const isExpanded = expandedAreas[area];

                                return (
                                    <div key={area} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                        <button
                                            onClick={() => setExpandedAreas(prev => ({ ...prev, [area]: !prev[area] }))}
                                            className="w-full flex items-center justify-between p-3 bg-gray-50 border-b border-gray-100"
                                        >
                                            <div className="flex items-center">
                                                {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-500 mr-2" /> : <ChevronRight className="w-4 h-4 text-gray-500 mr-2" />}
                                                <span className="font-bold text-gray-800 text-sm">{area}</span>
                                                <span className="ml-2 text-xs text-gray-500">({areaTasks.filter(t => t.completed).length}/{areaTasks.length})</span>
                                            </div>
                                        </button>
                                        {isExpanded && (
                                            <ul className="p-3 bg-slate-50/30 space-y-2">
                                                {areaTasks.map(item => {
                                                    const displayText = item.text.replace(`[${item.area}]`, '').trim();
                                                    return (
                                                        <li key={item.id} onClick={() => toggleTask('chores', item.id)} className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${item.completed ? 'bg-gray-100 opacity-75' : 'bg-white shadow-sm border border-gray-100'}`}>
                                                            <div className="flex items-center flex-1">
                                                                {item.completed ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-gray-300" />}
                                                                <span className={`ml-3 text-sm ${item.completed ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>{displayText}</span>
                                                            </div>
                                                            <button onClick={(e) => { e.stopPropagation(); deleteTask('chores', item.id); }} className="p-2 ml-2 text-gray-300 hover:text-red-500">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* 2. 장보기 리스트 탭 */}
                    {activeTab === 'ingredients' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="bg-red-50 text-red-800 text-xs p-3 rounded-lg mb-4 border border-red-100 flex items-start">
                                <span className="mr-2">🛒</span>
                                <span>장바구니 리스트입니다. 마트에서 구매 후 체크하면 상단의 <b>[보관함]</b>으로 이동합니다.</span>
                            </div>

                            <div className="flex items-center justify-between mb-3 ml-1">
                                <h2 className="text-sm font-bold text-gray-800 flex items-center">
                                    구매 필요 항목 <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{toBuyList.length}</span>
                                </h2>
                            </div>

                            {toBuyList.length === 0 ? (
                                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-200">
                                    <PackageCheck className="w-10 h-10 text-green-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500 font-medium">모든 재료를 구매했습니다!</p>
                                    <p className="text-xs text-gray-400 mt-1">헤더의 보관함을 확인하세요.</p>
                                </div>
                            ) : (
                                <ul className="space-y-2">
                                    {toBuyList.map(item => (
                                        <li key={item.id} onClick={() => toggleIngredientStatus(item.id)} className="flex items-center justify-between p-3.5 rounded-xl bg-white shadow-sm border border-gray-100 cursor-pointer hover:border-orange-200 transition-colors">
                                            <div className="flex items-center flex-1">
                                                <Circle className="w-5 h-5 text-gray-300" />
                                                <span className="ml-3 text-sm text-gray-700 font-medium">{item.text}</span>
                                            </div>
                                            <button onClick={(e) => { e.stopPropagation(); deleteTask('ingredients', item.id); }} className="p-2 text-gray-300 hover:text-red-500">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    {/* 3. 준비/조리 탭 */}
                    {activeTab === 'cooking' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">

                            {/* 요리별 재료 확인 아코디언 */}
                            <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
                                <button
                                    onClick={() => setIsRecipesExpanded(!isRecipesExpanded)}
                                    className="w-full flex items-center justify-between p-3.5 bg-orange-50/50 border-b border-orange-100"
                                >
                                    <div className="flex items-center">
                                        <ChefHat className="w-4 h-4 text-orange-500 mr-2" />
                                        <span className="font-bold text-gray-800 text-sm">요리별 재료 한눈에 보기</span>
                                    </div>
                                    {isRecipesExpanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                                </button>
                                {isRecipesExpanded && (
                                    <div className="p-4 bg-white space-y-3">
                                        {recipesData.map((recipe, idx) => (
                                            <div key={idx} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                                                <div className="font-bold text-sm text-orange-600 mb-1">{recipe.name}</div>
                                                <div className="text-xs text-gray-600 leading-relaxed">{recipe.ingredients}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* 시간대별 조리 순서 */}
                            <div>
                                <h2 className="text-sm font-bold text-gray-800 mb-3 ml-1">시간대별 조리 & 준비 체크리스트</h2>
                                <ul className="space-y-2">
                                    {tasks.cookingSteps.map((item, index) => (
                                        <li key={item.id} onClick={() => toggleTask('cookingSteps', item.id)} className={`flex items-center justify-between p-3.5 rounded-xl transition-all cursor-pointer ${item.completed ? 'bg-gray-100 opacity-75' : 'bg-white shadow-sm border border-gray-100'}`}>
                                            <div className="flex items-center flex-1">
                                                {item.completed ? <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> : <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />}
                                                <span className={`ml-3 text-sm leading-tight ${item.completed ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
                                                    {!item.completed && <span className="font-bold text-orange-500 mr-2">{index + 1}.</span>}
                                                    {item.text}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* 4. 세팅/서빙 탭 */}
                    {activeTab === 'serving' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg mb-4 border border-blue-100 flex items-start">
                                <span className="mr-2">🍷</span>
                                <span>완벽한 홈파티를 위한 <b>5코스 서빙 순서</b>입니다. 흐름이 끊기지 않게 체크하며 내어주세요.</span>
                            </div>
                            <ul className="space-y-2">
                                {tasks.serving.map((item, index) => (
                                    <li key={item.id} onClick={() => toggleTask('serving', item.id)} className={`flex items-center justify-between p-3.5 rounded-xl transition-all cursor-pointer ${item.completed ? 'bg-blue-50 opacity-75 border border-blue-100' : 'bg-white shadow-sm border border-gray-100'}`}>
                                        <div className="flex items-center flex-1">
                                            {item.completed ? <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" /> : <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />}
                                            <span className={`ml-3 text-sm leading-tight ${item.completed ? 'line-through text-blue-400' : 'text-gray-800 font-medium'}`}>
                                                {!item.completed && <span className="font-bold text-blue-500 mr-2">{index + 1}.</span>}
                                                {item.text}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </main>

                {/* 하단 입력 폼 */}
                <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 p-3 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-10">
                    <form onSubmit={addTask} className="flex gap-2">
                        {activeTab === 'chores' && (
                            <select value={newItemArea} onChange={(e) => setNewItemArea(e.target.value)} className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-orange-500 focus:border-orange-500 p-2 outline-none w-24">
                                {AREAS.map(area => <option key={area} value={area}>{area}</option>)}
                            </select>
                        )}
                        <input
                            type="text"
                            value={newItemText}
                            onChange={(e) => setNewItemText(e.target.value)}
                            placeholder={activeTab === 'ingredients' ? "새로운 장보기 항목 추가..." : "새로운 할 일 추가..."}
                            className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 outline-none"
                        />
                        <button type="submit" disabled={!newItemText.trim()} className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-lg px-3 py-2 transition-colors flex items-center justify-center">
                            <Plus className="w-5 h-5" />
                        </button>
                    </form>
                </div>

                {/* --- 보관함 (냉장고) 모달 --- */}
                {isStorageModalOpen && (
                    <div className="absolute inset-0 z-50 flex flex-col bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                        {/* 모달 밖 클릭시 닫기 영역 */}
                        <div className="flex-1" onClick={() => setIsStorageModalOpen(false)}></div>

                        {/* 모달 컨텐츠 (Bottom Sheet 형태) */}
                        <div className="bg-white rounded-t-3xl shadow-2xl h-[70%] flex flex-col animate-in slide-in-from-bottom-full duration-300">
                            <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                <div>
                                    <h2 className="text-lg font-extrabold text-gray-800 flex items-center">
                                        <Archive className="w-5 h-5 mr-2 text-orange-500" />
                                        내 보관함 (냉장고/팬트리)
                                    </h2>
                                    <p className="text-xs text-gray-500 mt-1">이미 구매했거나 집에 있는 재료들입니다.<br />체크를 해제하면 다시 장바구니로 돌아갑니다.</p>
                                </div>
                                <button onClick={() => setIsStorageModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-800 bg-gray-50 rounded-full">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
                                {storedList.length === 0 ? (
                                    <div className="text-center py-10 text-gray-400 text-sm">
                                        보관함이 비어있습니다.<br />장보기 리스트에서 항목을 체크해보세요.
                                    </div>
                                ) : (
                                    <ul className="space-y-2">
                                        {storedList.map(item => (
                                            <li
                                                key={item.id}
                                                onClick={() => toggleIngredientStatus(item.id)}
                                                className="flex items-center justify-between p-3.5 rounded-xl bg-white shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50"
                                            >
                                                <div className="flex items-center flex-1">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                    <span className="ml-3 text-sm text-gray-600 line-through decoration-gray-300">{item.text}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
        </div>
    );
}