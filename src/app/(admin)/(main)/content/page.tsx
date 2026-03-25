"use client";

import { useState, useCallback } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  Phone,
  ImageIcon,
} from "lucide-react";
import { Tabs, Tab } from "@heroui/tabs";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input, Textarea } from "@heroui/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Avatar } from "@heroui/avatar";
import { Select, SelectItem } from "@heroui/select";

// ==================== 首頁區塊資料 ====================

const sectionData = [
  { id: "hero", name: "首頁動畫", description: "序列幀動畫 + Hero 文字", status: "已發佈", updatedAt: "2026-03-20" },
  { id: "what", name: "關於 Doosee", description: "品牌介紹 + 痛點卡片 + 數據亮點", status: "已發佈", updatedAt: "2026-03-18" },
  { id: "pain", name: "常見困擾", description: "店家 / 回頭客 / 廠商三大角色痛點", status: "已發佈", updatedAt: "2026-03-15" },
  { id: "platform", name: "平台介紹", description: "POS 系統 / 設計師 APP / 客戶端 APP", status: "已發佈", updatedAt: "2026-03-15" },
  { id: "features", name: "功能介紹", description: "5 大功能特色卡片", status: "已發佈", updatedAt: "2026-03-14" },
  { id: "mission", name: "品牌使命", description: "核心價值宣言 + 5 大使命", status: "已發佈", updatedAt: "2026-03-12" },
  { id: "join", name: "加入我們", description: "合作商家跑馬燈 + 優惠方案 + 加入步驟", status: "已發佈", updatedAt: "2026-03-10" },
  { id: "footer", name: "頁腳", description: "聯絡資訊 + 社群連結 + 快速連結", status: "已發佈", updatedAt: "2026-03-10" },
];

// ==================== 客戶見證資料 ====================

const testimonialData = [
  { id: 1, name: "FLUX Hair Salon", role: "台北大安 · 髮廊", quote: "導入 Doosee 後，我們的預約管理效率提升了 60%。", status: "已發佈" },
  { id: 2, name: "Belle Nails", role: "台中西區 · 美甲", quote: "現在用 Doosee 的報表功能，營收、業績一目了然。", status: "已發佈" },
  { id: 3, name: "Vicky 老師", role: "美睫技術講師", quote: "Doosee 的預約確認和提醒功能，讓爽約率從 15% 降到不到 3%。", status: "已發佈" },
  { id: 4, name: "淨妍美學診所", role: "醫美 · 全台連鎖", quote: "多門市管理功能讓我在一個後台就能掌控全局。", status: "已發佈" },
  { id: 5, name: "Kevin 髮型師", role: "明星御用造型師", quote: "回訪提醒功能讓老客人回流率提升了 40%。", status: "草稿" },
];

// ==================== 方案資料 ====================

const planData = [
  { id: 1, name: "免費體驗", price: "免費", period: "14 天", features: 4, status: "已發佈", recommended: false },
  { id: 2, name: "創業啟航", price: "NT$990", period: "/月", features: 5, status: "已發佈", recommended: true },
  { id: 3, name: "年度夥伴", price: "NT$1,580", period: "/月（年繳）", features: 5, status: "已發佈", recommended: false },
];

// ==================== 聯絡資訊 ====================

const contactInfo = {
  email: "contact@doosee.com",
  phone: "02-1234-5678",
  address: "台北市信義區信義路五段7號",
  facebook: "https://facebook.com/doosee",
  instagram: "https://instagram.com/doosee",
  line: "https://line.me/doosee",
};

// ==================== 合作夥伴資料 ====================

const partnerData = [
  { id: 1, name: "FLUX Hair Salon", type: "髮廊 · 台北大安", row: "商家" },
  { id: 2, name: "Belle Nails", type: "美甲 · 台中西區", row: "商家" },
  { id: 3, name: "淨妍美學診所", type: "醫美 · 全台連鎖", row: "商家" },
  { id: 4, name: "Oasis SPA", type: "SPA · 高雄左營", row: "商家" },
  { id: 5, name: "Vicky 老師", type: "美睫技術講師 · 10 萬粉絲", row: "個人" },
  { id: 6, name: "Kevin 髮型師", type: "明星御用造型師", row: "個人" },
  { id: 7, name: "小安老師", type: "日式美甲達人 · 8 萬粉絲", row: "個人" },
  { id: 8, name: "阿倫 Hair", type: "YouTube 髮型教學 · 25 萬訂閱", row: "個人" },
];

const statusColorMap: Record<string, "success" | "warning"> = {
  已發佈: "success",
  草稿: "warning",
};

// ==================== 主元件 ====================

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState("sections");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const openEditor = (type: string) => {
    setEditingItem(type);
    onOpen();
  };

  return (
    <div className="space-y-6">
      {/* 標題 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">內容管理</h1>
          <p className="text-sm text-gray-400 mt-1">管理前台網站的所有內容</p>
        </div>
        <Button
          onPress={() => openEditor("new")}
          className="bg-blue-500 text-white rounded-xl px-5 h-10 font-medium hover:bg-blue-600"
        >
          <Plus size={16} /> 新增內容
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(String(key))}
        variant="light"
        radius="full"
        classNames={{
          tabList: "bg-gray-100 p-1 rounded-full",
          tab: "px-6 py-1.5 text-sm font-medium",
          cursor: "bg-blue-500 rounded-full",
        }}
      >
        <Tab key="sections" title="頁面區塊" />
        <Tab key="testimonials" title="客戶見證" />
        <Tab key="plans" title="優惠方案" />
        <Tab key="partners" title="合作夥伴" />
        <Tab key="contact" title="聯絡資訊" />
      </Tabs>

      {/* ==================== 頁面區塊 ==================== */}
      {activeTab === "sections" && (
        <Table
          aria-label="頁面區塊"
          classNames={{
            wrapper: "rounded-2xl shadow-sm",
            th: "text-xs text-gray-400 font-medium bg-white",
          }}
        >
          <TableHeader>
            <TableColumn>區塊名稱</TableColumn>
            <TableColumn>說明</TableColumn>
            <TableColumn>狀態</TableColumn>
            <TableColumn>最後更新</TableColumn>
            <TableColumn>操作</TableColumn>
          </TableHeader>
          <TableBody>
            {sectionData.map((section) => (
              <TableRow key={section.id}>
                <TableCell>
                  <span className="text-sm font-semibold text-gray-900">{section.name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-500">{section.description}</span>
                </TableCell>
                <TableCell>
                  <Chip size="sm" variant="flat" color={statusColorMap[section.status]}>{section.status}</Chip>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-400">{section.updatedAt}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button isIconOnly size="sm" variant="light" onPress={() => openEditor(section.id)}>
                      <Pencil size={16} className="text-gray-400" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* ==================== 客戶見證 ==================== */}
      {activeTab === "testimonials" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button onPress={() => openEditor("testimonial-new")} className="bg-blue-500 text-white rounded-xl px-4 h-9 text-sm font-medium hover:bg-blue-600">
              <Plus size={14} /> 新增見證
            </Button>
          </div>
          <Table
            aria-label="客戶見證"
            classNames={{
              wrapper: "rounded-2xl shadow-sm",
              th: "text-xs text-gray-400 font-medium bg-white",
            }}
          >
            <TableHeader>
              <TableColumn>客戶</TableColumn>
              <TableColumn>見證內容</TableColumn>
              <TableColumn>狀態</TableColumn>
              <TableColumn>操作</TableColumn>
            </TableHeader>
            <TableBody>
              {testimonialData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar name={item.name.charAt(0)} size="sm" classNames={{ base: "bg-purple-50 shrink-0", name: "text-purple-500 font-semibold" }} />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.role}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600 line-clamp-1 max-w-md">{item.quote}</span>
                  </TableCell>
                  <TableCell>
                    <Chip size="sm" variant="flat" color={statusColorMap[item.status]}>{item.status}</Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button isIconOnly size="sm" variant="light" onPress={() => openEditor("testimonial-edit")}>
                        <Pencil size={16} className="text-gray-400" />
                      </Button>
                      <Button isIconOnly size="sm" variant="light">
                        <Trash2 size={16} className="text-gray-400" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* ==================== 優惠方案 ==================== */}
      {activeTab === "plans" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planData.map((plan) => (
            <div key={plan.id} className={`rounded-2xl border bg-white p-6 relative ${plan.recommended ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-100"}`}>
              {plan.recommended && (
                <Chip size="sm" color="primary" className="absolute -top-2.5 left-4">推薦方案</Chip>
              )}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                <Chip size="sm" variant="flat" color={statusColorMap[plan.status]}>{plan.status}</Chip>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{plan.price}</p>
              <p className="text-sm text-gray-400 mb-4">{plan.period}</p>
              <p className="text-sm text-gray-500 mb-6">{plan.features} 項功能特色</p>
              <Button fullWidth variant="bordered" onPress={() => openEditor("plan-edit")} className="rounded-xl">
                <Pencil size={14} /> 編輯方案
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* ==================== 合作夥伴 ==================== */}
      {activeTab === "partners" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button onPress={() => openEditor("partner-new")} className="bg-blue-500 text-white rounded-xl px-4 h-9 text-sm font-medium hover:bg-blue-600">
              <Plus size={14} /> 新增夥伴
            </Button>
          </div>
          <Table
            aria-label="合作夥伴"
            classNames={{
              wrapper: "rounded-2xl shadow-sm",
              th: "text-xs text-gray-400 font-medium bg-white",
            }}
          >
            <TableHeader>
              <TableColumn>名稱</TableColumn>
              <TableColumn>類型</TableColumn>
              <TableColumn>跑馬燈列</TableColumn>
              <TableColumn>操作</TableColumn>
            </TableHeader>
            <TableBody>
              {partnerData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar name={item.name.charAt(0)} size="sm" classNames={{ base: "bg-green-50 shrink-0", name: "text-green-500 font-semibold" }} />
                      <span className="text-sm font-semibold text-gray-900">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell><span className="text-sm text-gray-500">{item.type}</span></TableCell>
                  <TableCell>
                    <Chip size="sm" variant="flat" color={item.row === "商家" ? "primary" : "secondary"}>{item.row}</Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button isIconOnly size="sm" variant="light"><Pencil size={16} className="text-gray-400" /></Button>
                      <Button isIconOnly size="sm" variant="light"><Trash2 size={16} className="text-gray-400" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* ==================== 聯絡資訊 ==================== */}
      {activeTab === "contact" && (
        <div className="max-w-2xl">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Phone size={18} className="text-blue-500" /> 聯絡資訊
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input label="聯絡信箱" defaultValue={contactInfo.email} variant="bordered" classNames={{ inputWrapper: "rounded-xl" }} />
              <Input label="聯絡電話" defaultValue={contactInfo.phone} variant="bordered" classNames={{ inputWrapper: "rounded-xl" }} />
            </div>
            <Input label="地址" defaultValue={contactInfo.address} variant="bordered" classNames={{ inputWrapper: "rounded-xl" }} />

            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pt-4">
              <ImageIcon size={18} className="text-blue-500" /> 社群連結
            </h3>
            <div className="space-y-4">
              <Input label="Facebook" defaultValue={contactInfo.facebook} variant="bordered" classNames={{ inputWrapper: "rounded-xl" }} />
              <Input label="Instagram" defaultValue={contactInfo.instagram} variant="bordered" classNames={{ inputWrapper: "rounded-xl" }} />
              <Input label="LINE" defaultValue={contactInfo.line} variant="bordered" classNames={{ inputWrapper: "rounded-xl" }} />
            </div>

            <div className="flex justify-end pt-2">
              <Button className="bg-blue-500 text-white rounded-xl px-6 h-10 font-medium hover:bg-blue-600">
                儲存變更
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 編輯 Modal ==================== */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" placement="center" classNames={{ base: "bg-white rounded-2xl" }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold">
                {editingItem?.includes("new") ? "新增內容" : "編輯內容"}
              </ModalHeader>
              <ModalBody className="gap-5">
                <Input label="標題" placeholder="請輸入標題" variant="bordered" classNames={{ inputWrapper: "rounded-xl" }} />
                <Textarea label="描述" placeholder="請輸入描述內容" variant="bordered" minRows={3} classNames={{ inputWrapper: "rounded-xl" }} />
                <Select label="狀態" defaultSelectedKeys={["published"]} variant="bordered" classNames={{ trigger: "rounded-xl" }}>
                  <SelectItem key="published">已發佈</SelectItem>
                  <SelectItem key="draft">草稿</SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>取消</Button>
                <Button onPress={onClose} className="bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600">
                  儲存
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
