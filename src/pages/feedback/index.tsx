import { useState } from "react";
import { Modal, notification, Table, Button as AntButton } from "antd";
import { Delete, Edit } from "assets/images/icons";
import { useHooks, usePost } from "hooks";
import { Container } from "modules";
import Create from "./create";
import More from "./more";

const Feedback = () => {
  const { get, queryClient, t } = useHooks();
  const [createModal, showCreateModal] = useState({ open: false, data: {} });
  const [moreModal, showMoreModal] = useState({ open: false, data: {} });
  const { mutate } = usePost();

  const onDeleteHandler = (id: string) => {
    Modal.confirm({
      title: t("Вы уверены что хотите удалить?"),
      okText: t("да"),
      okType: "danger",
      cancelText: t("нет"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `/feedbacks/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
            notification.success({
              message: t("Успешно удалена"),
              duration: 2,
            });
          },
          onError: (error) => {
            notification.error({
              message: get(error, "errorMessage", t("Произошло ошибка!")),
              duration: 2,
            });
          },
        }
      );
    }
  };

  const columns = [
    {
      title: t("Feedback"),
      dataIndex: "feedback",
      key: "feedback",
      ellipsis: true,
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      ellipsis: true,
      render: (status: boolean) => (
        <span style={{ color: status ? "green" : "red" }}>
          {status ? t("Active") : t("Inactive")}
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
    {
      title: t("Actions"),
      key: "actions",
      ellipsis: true,
      render: (text: any, record: any) => (
        <span>
          <AntButton
            icon={<Edit />}
            onClick={(e) => {
              {
                e.stopPropagation();
                showCreateModal({ open: true, data: record });
              }
            }}
            style={{
              marginLeft: 8,
              borderColor: "green",
              background: "green",
              padding: "20px 20px",
            }}
          />
          <AntButton
            icon={<Delete />}
            onClick={(e) => {
              {
                e.stopPropagation();
                onDeleteHandler(record._id);
              }
            }}
            style={{
              marginLeft: 8,
              borderColor: "red",
              background: "red",
              padding: "20px 20px",
            }}
          />
        </span>
      ),
    },
  ];

  return (
    <div className="flex">
      <Modal
        open={createModal.open}
        onCancel={() => showCreateModal({ open: false, data: {} })}
        footer={null}
        centered
        title={
          get(createModal, "data._id")
            ? t("Update feedback")
            : t("Create feedback")
        }
        width={600}
        destroyOnClose
      >
        <Create {...{ showCreateModal, createModal }} />
      </Modal>
      <Modal
        open={moreModal.open}
        onCancel={() => showMoreModal({ open: false, data: {} })}
        footer={null}
        centered
        title={t("More information")}
        width={600}
        destroyOnClose
      >
        <More {...{ showMoreModal, moreModal }} />
      </Modal>
      <div>
        <Container.All name="feedbacks" url="/feedbacks">
          {({ items, meta }) => (
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

export default Feedback;
