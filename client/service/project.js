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
export const postProject = async (form, imageFile) => {
  const formData = new FormData();

  formData.append("title", form.title);
  formData.append("subtitle", form.subtitle);
  formData.append("description", form.description);
  formData.append("demo_url", form.demo_url);
  formData.append("github_url", form.github_url);

  if (imageFile) {
    formData.append("image", imageFile); // 👈 ตรงกับ `upload.single('image')`
  }

  return fetcher("/projects", {
    method: "POST",
    body: formData,
    isForm: true, // ✅ ตัวเลือกนี้เราจะใช้ใน fetcher เพื่อไม่ใส่ Content-Type
  });
};

// ✅ แก้ไขโปรเจกต์
export const updateProjectById = async (id, form, imageFile) => {
  const formData = new FormData();

  formData.append("title", form.title);
  formData.append("subtitle", form.subtitle);
  formData.append("description", form.description);
  formData.append("demo_url", form.demo_url);
  formData.append("github_url", form.github_url);

  if (imageFile) {
    formData.append("image", imageFile);
  }

  return fetcher(`/projects/${id}`, {
    method: "PUT",
    body: formData,
    isForm: true,
  });
};

// ✅ ลบโปรเจกต์
export const deleteProjectById = async (id) =>
  fetcher(`/projects/${id}`, {
    method: "DELETE",
  });
