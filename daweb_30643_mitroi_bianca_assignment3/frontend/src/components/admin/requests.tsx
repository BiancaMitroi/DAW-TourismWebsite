import { SectionContent } from "../../interfaces/ISectionContent";

function formDataMap(data: SectionContent) {
  const formData = new FormData();
  data.title && formData.append("title", data.title);
  data.description && formData.append("description", data.description);
  data.location && formData.append("location", data.location);
  data.pricePerNight &&
    formData.append("pricePerNight", data.pricePerNight?.toString());
  data.offer && formData.append("offer", data.offer?.toString());
  data.capacity && formData.append("capacity", data.capacity?.toString());
  if (data.image instanceof File) {
    formData.append("image", data.image);
  }
  console.log(formData);
  return formData;
}

const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");

export const add = async (value: SectionContent) => {
  const response = await fetch("http://localhost:8000/api/v1/destinations/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokens.access}`,
    },
    body: formDataMap(value),
  }).catch((error: Error) => {
    console.error("Error:", error.message);
  });

  if (response?.ok) {
    if (response.status !== 204) {
      window.location.reload();
    }
  }
};

export const update = async (value: SectionContent) => {
  const param = encodeURIComponent(value.title ?? "");
  const response = await fetch(
    `http://localhost:8000/api/v1/destinations/${param}/`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
      body: formDataMap(value),
    },
  ).catch((error) => {
    console.error("Error:", error);
  });

  if (response?.ok) {
    if (response.status !== 204) {
      window.location.reload();
    }
  }
};

export const remove = async (value: SectionContent) => {
  const param = encodeURIComponent(value.title ?? "");
  await fetch(`http://localhost:8000/api/v1/destinations/${param}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${tokens.access}`,
    },
  }).catch((error) => {
    console.error("Error:", error);
  });
  window.location.reload();
};
