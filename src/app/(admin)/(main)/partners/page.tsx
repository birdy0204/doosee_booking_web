"use client";

import { useState, useCallback } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Avatar } from "@heroui/avatar";
import { Select, SelectItem } from "@heroui/select";

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

// ==================== 主元件 ====================

export default function PartnersPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const openEditor = useCallback((type: string) => {
    setEditingItem(type);
    onOpen();
  }, [onOpen]);

  return (
    <div className="space-y-6">
      {/* 標題 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">合作夥伴</h1>
          <p className="text-sm text-gray-400 mt-1">管理前台首頁的合作夥伴跑馬燈</p>
        </div>
        <Button
          onPress={() => openEditor("partner-new")}
          className="bg-blue-500 text-white rounded-xl px-5 h-10 font-medium hover:bg-blue-600"
        >
          <Plus size={16} /> 新增夥伴
        </Button>
      </div>

      {/* 表格 */}
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
                  <Button isIconOnly size="sm" variant="light" onPress={() => openEditor("partner-edit")}>
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

      {/* 編輯 Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" placement="center" classNames={{ base: "bg-white rounded-2xl" }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold">
                {editingItem?.includes("new") ? "新增合作夥伴" : "編輯合作夥伴"}
              </ModalHeader>
              <ModalBody className="gap-5">
                <Input label="名稱" placeholder="請輸入夥伴名稱" variant="bordered" classNames={{ inputWrapper: "rounded-xl" }} />
                <Input label="描述" placeholder="例：髮廊 · 台北大安" variant="bordered" classNames={{ inputWrapper: "rounded-xl" }} />
                <Select label="分類" defaultSelectedKeys={["company"]} variant="bordered" classNames={{ trigger: "rounded-xl" }}>
                  <SelectItem key="company">商家</SelectItem>
                  <SelectItem key="personal">個人 IP</SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>取消</Button>
                <Button onPress={onClose} className="bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600">儲存</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
