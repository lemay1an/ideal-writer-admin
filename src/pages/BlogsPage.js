/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { LikeOutlined, ShareAltOutlined, DeleteOutlined } from '@ant-design/icons';
import { Stack, Container, Typography } from '@mui/material';
import { Button, Avatar, List, Space, Modal, Input, Spin } from 'antd';
import { useBlogs } from '../hooks/useBlogs';
import { useCreateBlogs } from '../hooks/useCreateBlogs';
import { useDeleteBlog } from '../hooks/useDeleteBlog';

const { TextArea } = Input;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function BlogsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { blogs, isLoading, error } = useBlogs();
  const { createBlogAPI } = useCreateBlogs();
  const { deleteBlogAPI, isDeleting } = useDeleteBlog();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const data = { email: 'maina', name: 'Alex Maina' };
    createBlogAPI(data);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const blogsData = blogs?.data?.map((blog) => ({
    href: 'https://ant.design',
    title: blog?.title,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=0`,
    content: blog?.description,
    description: '',
    likes: blog?.likes,
    shareCount: blog?.shareCount,
    id: blog?._id,
  }));

  if (isLoading) return <Spin style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />;

  return (
    <>
      <Helmet>
        <title> Blogs | PAY A WRITER </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blogs
          </Typography>

          <Button onClick={showModal}>Add Blog</Button>
        </Stack>

        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={blogsData}
          footer={
            <div>
              <b>Pay a Writer</b> Blog
            </div>
          }
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                <IconText icon={ShareAltOutlined} text={item?.shareCount} key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text={item?.likes} key="list-vertical-like-o" />,
                <button
                  style={{
                    cursor: 'pointer',
                    outline: 'none',
                    border: '0px solid black',
                    backgroundColor: 'transparent',
                  }}
                  onClick={() => {
                    console.log(item);
                    deleteBlogAPI(item?.id);
                  }}
                >
                  <IconText icon={DeleteOutlined} text={'DELETE'} key="list-vertical-like-o" />,
                </button>,
              ]}
              extra={
                <img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </Container>

      <Modal title="Add a Blog" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ zIndex: 100 }}>
        <form>
          <div style={{ marginTop: '2rem' }}>
            <Input placeholder="Title" onChange={(e) => console.log(e.target.value)} size="large" />
          </div>

          <div style={{ marginTop: '2rem', marginBottom: '4rem' }}>
            <TextArea
              showCount
              maxLength={100}
              placeholder="Description"
              style={{
                height: 120,
                resize: 'none',
              }}
            />
          </div>
        </form>
      </Modal>
    </>
  );
}

export default BlogsPage;
