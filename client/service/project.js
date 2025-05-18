import { fetcher } from "./api";


// ✅ ดึงทั้งหมด
export const getAllProjects = async () =>
  fetcher("/projects", {
    method: "GET",
  });

// ✅ ดึงเฉพาะ project ตาม id
export const getProjectById = async ({ id }) =>
  fetcher(`/projects/${id}`, {
    method: "GET",
  });

// ✅ สร้างโปรเจกต์ใหม่
export const postProject = async ({
  title,
  subtitle,
  description,
  image_url,
  demo_url,
  github_url,
}) =>
  fetcher("/projects", {
    method: "POST",
    body: JSON.stringify({
      title,
      subtitle,
      description,
      image_url,
      demo_url,
      github_url,
    }),
  });

// ✅ แก้ไขโปรเจกต์
export const updateProjectById = async (
  id,
  {
    title,
    subtitle,
    description,
    image_url,
    demo_url,
    github_url,
  }
) =>
  fetcher(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      subtitle,
      description,
      image_url,
      demo_url,
      github_url,
    }),
  });

// ✅ ลบโปรเจกต์
export const deleteProjectById = async (id) =>
  fetcher(`/projects/${id}`, {
    method: "DELETE",
  });
