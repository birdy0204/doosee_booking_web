"use client";

import { useState, useCallback } from "react";
import { Pencil } from "lucide-react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input, Textarea } from "@heroui/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
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

const statusColorMap: Record<string, "success" | "warning"> = {
  已發佈: "success",
  草稿: "warning",
};

// ==================== 主元件 ====================

export default function ContentPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const openEditor = useCallback((type: string) => {
    setEditingItem(type);
    onOpen();
  }, [onOpen]);

  return (
    <div className="space-y-6">
      {/* 標題 */}
      <div>
        <h1 className="text-2xl font-bold">頁面區塊</h1>
        <p className="text-sm text-gray-400 mt-1">管理前台網站的首頁區塊內容</p>
      </div>

      {/* 表格 */}
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

      {/* 編輯 Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" placement="center" classNames={{ base: "bg-white rounded-2xl" }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold">編輯區塊</ModalHeader>
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
                <Button onPress={onClose} className="bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600">儲存</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
