import { useState } from "react";
import { Modal, Table } from "antd";
import { useHooks } from "hooks";
import { Container } from "modules";
import More from "./more";

const Marked = () => {
  const { t } = useHooks();
  const [moreModal, showMoreModal] = useState({ open: false, data: {} });

  const columns = [
    {
      title: t("Project"),
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: t("Student"),
      dataIndex: ["student" , "username"],
      key: "student.username",
      ellipsis: true,
    },
    {
      title: t("is Correct"),
      dataIndex: "isCorrect",
      key: "isCorrect",
      ellipsis: true,
      render: (status: boolean) => (
        <span style={{ color: status ? "green" : "red" }}>
          {status ? t("True") : t("False")}
        </span>
      ),
    },
    {
      title: t("Created at"),
      dataIndex: "createdAt",
      key: "createdAt",
      ellipsis: true,
      render: (date: string) => <span>{new Date(date).toLocaleString()}</span>,
    },
  ];

  return (
    <div className="flex">
      <Modal
        open={moreModal.open}
        onCancel={() => showMoreModal({ open: false, data: {} })}
        footer={null}
        centered
        title={t("More information")}
        width={800}
        destroyOnClose
      >
        <More {...{ showMoreModal, moreModal }} />
      </Modal>
      <div>
        <Container.All name="marked" url="/pereviews/marked">
          {({ items }) => (
            <div>
              <Table
                columns={columns}
                dataSource={items}
                pagination={false}
                rowKey="_id"
                className="mt-[15px] bg-white dark:bg-[#454d70] rounded-[10px]"
                onRow={(record) => ({
                  onClick: () => showMoreModal({ open: true, data: record }),
                })}
              />
            </div>
          )}
        </Container.All>
      </div>
    </div>
  );
};

export default Marked;
