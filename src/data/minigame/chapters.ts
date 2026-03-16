import { Chapter } from '@/types/minigame';

export const GAME_CHAPTERS: Chapter[] = [
  {
    id: "chap_1",
    number: 1,
    title: "Đêm Trước Bước Ngoặt",
    period: "Trước năm 1930",
    description: "Cả dân tộc chìm trong đêm đen nô lệ. Các phong trào yêu nước theo khuynh hướng cũ liên tiếp thất bại. Lịch sử đang tìm kiếm một con đường mới.",
    missions: [
      {
        id: "m_1_decision",
        type: "decision",
        title: "Sự Bế Tắc Của Lịch Sử",
        instructions: "Phong trào Cần Vương và các cuộc khởi nghĩa nông dân, tư sản đã thất bại. Sự bóc lột của thực dân Pháp ngày càng tàn bạo. Là một người tìm đường cứu nước, bạn sẽ lựa chọn hướng đi nào?",
        rewardScore: 100,
        unlockId: "doc_marxism",
        questions: [
          {
            id: "q_1",
            prompt: "Phong trào Cần Vương và các cuộc khởi nghĩa nông dân, tư sản đã thất bại. Sự bóc lột của thực dân Pháp ngày càng tàn bạo. Là một người tìm đường cứu nước, bạn sẽ lựa chọn hướng đi nào?",
            options: [
              { id: "opt_1", text: "Tiếp tục con đường phong kiến, hi vọng một minh quân cứu nước.", isCorrect: false, feedback: "Sai lầm. Hệ tư tưởng phong kiến đã lỗi thời." },
              { id: "opt_2", text: "Dựa vào Nhật hoặc Pháp để giành độc lập.", isCorrect: false, feedback: "Giao trứng cho ác. Dựa vào đế quốc này đánh đế quốc khác là sai lầm." },
              { id: "opt_3", text: "Tiếp thu Chủ nghĩa Mác-Lênin, đi theo Cách mạng Vô sản.", isCorrect: true, feedback: "Chính xác! Lãnh tụ Nguyễn Ái Quốc đã tìm ra con đường cứu nước đúng đắn nhất." }
            ]
          },
          {
            id: "q_2",
            prompt: "Đặc điểm cơ bản nhất của giai cấp công nhân Việt Nam khi mới ra đời là gì?",
            options: [
              { id: "opt_1", text: "Số lượng rất đông đảo và có trình độ cao.", isCorrect: false, feedback: "Chưa đúng. Lúc bấy giờ công nhân VN còn ít và trình độ chưa cao." },
              { id: "opt_2", text: "Chịu ba tầng áp bức bức lột: Đế quốc, phong kiến, tư sản.", isCorrect: true, feedback: "Đúng. Do đó giai cấp công nhân có tinh thần cách mạng triệt để nhất." },
              { id: "opt_3", text: "Chủ yếu xuất thân từ tầng lớp trí thức tiểu tư sản.", isCorrect: false, feedback: "Sai. Công nhân Việt Nam chủ yếu xuất thân từ nông dân bị tước đoạt ruộng đất." }
            ]
          },
          {
            id: "q_3",
            prompt: "Sự kiện nào đánh dấu giai cấp công nhân Việt Nam bước đầu chuyển từ đấu tranh tự phát sang đấu tranh tự giác?",
            options: [
              { id: "opt_1", text: "Cuộc bãi công của thợ máy xưởng Ba Son (Tôn Đức Thắng lãnh đạo) tháng 8/1925.", isCorrect: true, feedback: "Chính xác! Đây là cột mốc quan trọng chứng tỏ công nhân đã bắt đầu đấu tranh có tổ chức." },
              { id: "opt_2", text: "Phong trào đấu tranh của công nhân cao su Phú Riềng.", isCorrect: false, feedback: "Chưa chính xác sự kiện đánh dấu đầu tiên." },
              { id: "opt_3", text: "Sự ra đời của tổ chức Công hội đỏ.", isCorrect: false, feedback: "Chưa phải là sự kiện bãi công tiêu biểu đánh dấu bước ngoặt này." }
            ]
          },
          {
            id: "q_4",
            prompt: "Tác phẩm nào của Nguyễn Ái Quốc đã trang bị lý luận cách mạng giải phóng dân tộc cho cán bộ của Hội Việt Nam Cách mạng Thanh niên?",
            options: [
              { id: "opt_1", text: "Bản án chế độ thực dân Pháp", isCorrect: false, feedback: "Tác phẩm này tố cáo tội ác thực dân, nhưng chưa phải là giáo trình chính." },
              { id: "opt_2", text: "Đường Kách mệnh", isCorrect: true, feedback: "Đúng! Đường Kách Mệnh (1927) là cuốn sách tập hợp các bài giảng của Người tại Quảng Châu." },
              { id: "opt_3", text: "Chánh cương vắn tắt", isCorrect: false, feedback: "Chánh cương vắn tắt ra đời sau này vào năm 1930." }
            ]
          },
          {
            id: "q_5",
            prompt: "Hội Việt Nam Cách mạng Thanh niên do Nguyễn Ái Quốc sáng lập (1925) có vai trò gì quan trọng?",
            options: [
              { id: "opt_1", text: "Lãnh đạo ngay lập tức các cuộc khởi nghĩa vũ trang.", isCorrect: false, feedback: "Hội chưa đủ lực lượng để khởi nghĩa vũ trang lúc bấy giờ." },
              { id: "opt_2", text: "Chuẩn bị về tổ chức, cán bộ và truyền bá Chủ nghĩa Mác-Lênin về trong nước.", isCorrect: true, feedback: "Đúng. Hội là tổ chức tiền thân có ý nghĩa quan trọng nhất dọn đường cho Đảng ra đời." },
              { id: "opt_3", text: "Là một tổ chức cộng sản chính thức của quốc tế thứ ba.", isCorrect: false, feedback: "Sai. Hội TNCM Đồng chí chưa phải là Đảng Cộng sản chính thức." }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "chap_2",
    number: 2,
    title: "Hội Tụ",
    period: "Mùa Xuân 1930",
    description: "Đến cuối năm 1929, phong trào công nhân lên cao dẫn đến sự ra đời của 3 tổ chức cộng sản. Tuy nhiên sự chia rẽ đang đe dọa cách mạng.",
    missions: [
      {
        id: "m_2_timeline",
        type: "timeline",
        title: "Quy Tái Dòng Thời Gian",
        instructions: "Hệ thống lưu trữ đang bị lỗi. Bạn hãy kéo thả để phân loại và sắp xếp lại trình tự các sự kiện dẫn đến việc thành lập Đảng theo đúng mốc thời gian lịch sử.",
        rewardScore: 150,
        unlockId: "person_nguyen_ai_quoc",
        timelineEvents: [
          { id: "ev_1", label: "Đông Dương Cộng sản Đảng và An Nam Cộng sản Đảng được thành lập", expectedOrder: 1 },
          { id: "ev_2", label: "Đông Dương Cộng sản Liên đoàn ra đời", expectedOrder: 2 },
          { id: "ev_3", label: "Nguyễn Ái Quốc triệu tập đại biểu từ Thái Lan về Hương Cảng (Trung Quốc)", expectedOrder: 3 },
          { id: "ev_4", label: "Hội nghị hợp nhất, chính thức lập ra Đảng Cộng sản Việt Nam", expectedOrder: 4 }
        ]
      }
    ]
  },
  {
    id: "chap_3",
    number: 3,
    title: "Ngọn Cờ Chỉ Đường",
    period: "Tháng 2 năm 1930",
    description: "Tại Hội nghị hợp nhất, một khối văn kiện lịch sử đã được thông qua, vạch ra con đường đúng đắn cho cách mạng Việt Nam.",
    missions: [
      {
        id: "m_3_decoder",
        type: "decoder",
        title: "Giải Mã Cương Lĩnh",
        instructions: "Người dùng thế kỷ 21 không hiểu các khái niệm lược dịch. Hãy ghép các đoạn mã thông điệp thể hiện mục tiêu chiến lược trong Cương lĩnh chính trị đầu tiên.",
        rewardScore: 200,
        unlockId: "doc_platform",
        decoderItems: [
          { id: "dec_1", clue: "Mục tiêu chiến lược trị giá nhất", encrypted: "ĐĐ ĐQ Pháp & BP Kiến", decrypted: "Đánh đổ đế quốc chủ nghĩa Pháp và bọn phong kiến" },
          { id: "dec_2", clue: "Khát vọng dân tộc", encrypted: "L N VN Đ HT ĐL", decrypted: "Làm cho nước Nam được hoàn toàn độc lập" },
          { id: "dec_3", clue: "Lực lượng duy nhất lãnh đạo", encrypted: "GCCN VN thông qua Đ CS", decrypted: "Giai cấp công nhân Việt Nam thông qua Đảng Cộng sản" },
          { id: "dec_4", clue: "Tinh thần đoàn kết", encrypted: "L CH với các DT bị AP", decrypted: "Liên hiệp với các dân tộc bị áp bức" },
          { id: "dec_5", clue: "Tương lai xã hội", encrypted: "Đi tới XH Cộng Sản", decrypted: "Đi tới xã hội Cộng sản" }
        ]
      }
    ]
  },
  {
    id: "chap_4",
    number: 4,
    title: "Mốc Son Chói Lọi",
    period: "Tháng 2 năm 1930",
    description: "Sau khi các tổ chức cộng sản hợp nhất, biểu tượng Búa Liềm đã trở thành niềm tự hào và là ngọn cờ dẫn dắt cách mạng Việt Nam.",
    missions: [
      {
        id: "m_4_puzzle",
        type: "puzzle",
        title: "Biểu Tượng Kiêu Hãnh",
        instructions: "Hãy khôi phục lại biểu tượng thiêng liêng của Đảng Cộng sản Việt Nam bằng cách sắp xếp các mảnh ghép về đúng vị trí.",
        rewardScore: 250,
        unlockId: "doc_vcp_flag",
        puzzleImage: "/images/party-flag.jpg"
      }
    ]
  },
  {
    id: "chap_5",
    number: 5,
    title: "Mạng Lưới Bí Mật",
    period: "Tháng 2 - Tháng 4 năm 1930",
    description: "Sau khi hợp nhất, các chi bộ Đảng cần được kết nối chặt chẽ để truyền bá Cương lĩnh và tổ chức phong trào đấu tranh trên toàn quốc.",
    missions: [
      {
        id: "m_5_connector",
        type: "connector",
        title: "Thiết Lập Liên Lạc",
        instructions: "Hệ thống liên lạc bí mật đang bị xáo trộn. Hãy xoay các nút dữ liệu để tạo thành một mạng lưới thông suốt từ Trung ương (Hương Cảng) đến các cơ sở tại Ba Kỳ (Hà Nội, Huế, Sài Gòn).",
        rewardScore: 300,
        unlockId: "doc_network",
        gridSize: 6,
        connectorNodes: [
          // Row 0
          { id: "n_0", type: "elbow", rotation: 90 }, 
          { id: "n_1", type: "straight", rotation: 90 },
          { id: "n_2", type: "tee", rotation: 180, isTarget: true, label: "Hà Nội" },
          { id: "n_3", type: "straight", rotation: 0 },
          { id: "n_4", type: "elbow", rotation: 180, isSource: true, label: "Hương Cảng" },
          // Row 1
          { id: "n_5", type: "straight", rotation: 0 },
          { id: "n_6", type: "elbow", rotation: 270 },
          { id: "n_7", type: "straight", rotation: 0 },
          { id: "n_8", type: "elbow", rotation: 0 },
          { id: "n_9", type: "straight", rotation: 90 },
          // Row 2
          { id: "n_10", type: "elbow", rotation: 180 },
          { id: "n_11", type: "straight", rotation: 90 },
          { id: "n_12", type: "tee", rotation: 90, isTarget: true, label: "Huế" },
          { id: "n_13", type: "straight", rotation: 0 },
          { id: "n_14", type: "elbow", rotation: 0 },
          // Row 3
          { id: "n_15", type: "straight", rotation: 90 },
          { id: "n_16", type: "elbow", rotation: 270 },
          { id: "n_17", type: "straight", rotation: 90 },
          { id: "n_18", type: "elbow", rotation: 180 },
          { id: "n_19", type: "straight", rotation: 0 },
          // Row 4
          { id: "n_20", type: "elbow", rotation: 0, isTarget: true, label: "Sài Gòn" },
          { id: "n_21", type: "straight", rotation: 90 },
          { id: "n_22", type: "straight", rotation: 90 },
          { id: "n_23", type: "elbow", rotation: 270 },
          { id: "n_24", type: "straight", rotation: 0 },
          // New nodes for 6x6 (total 36 nodes)
          { id: "n_25", type: "straight", rotation: 0 },
          { id: "n_26", type: "elbow", rotation: 90 },
          { id: "n_27", type: "tee", rotation: 180 },
          { id: "n_28", type: "straight", rotation: 90 },
          { id: "n_29", type: "elbow", rotation: 270 },
          { id: "n_30", type: "cross", rotation: 0 },
          { id: "n_31", type: "straight", rotation: 0 },
          { id: "n_32", type: "elbow", rotation: 180 },
          { id: "n_33", type: "tee", rotation: 0 },
          { id: "n_34", type: "straight", rotation: 90 },
          { id: "n_35", type: "elbow", rotation: 270 }
        ]
      }
    ]
  }
];
