import { useState } from 'react';
import type { AddPostFormProps } from '../interfaces/interfaces';

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const AddPostForm = ({ users, onPostAdded, setSuccessMessage }: AddPostFormProps) => {
  const [form, setForm] = useState({ title: "", body: "", userId: "" });
  const [addingPost, setAddingPost] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.body || !form.userId) {
      setErrorMessage("Please fill in all forms before submitting!");
      return;
    }
    
    setAddingPost(true);
    setErrorMessage("");

    try {
      const response = await fetch(POSTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          body: form.body,
          userId: Number(form.userId),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const newLocalPost = { ...data, id: Date.now() };

      onPostAdded(newLocalPost);
      setForm({ title: "", body: "", userId: "" }); 
      window.scrollTo({ top: 0, behavior: "smooth" });

      setSuccessMessage("Post has been added successfully!");
      setTimeout(() => {
        setSuccessMessage("Post has been added successfully!");
        setTimeout(() => {
        setSuccessMessage("");
        }, 2000);
      }, 1000); 

    } catch (error) {
      console.error("Failed to add post:", error);
      setErrorMessage("Failed to add post. Please try again later.");
    } finally {
      setAddingPost(false);
    }
  };

  return (
    <div className='add-post-form-container'>
      {errorMessage && <div style={{ color: "orange", marginBottom: 8 }}>{errorMessage}</div>}
      <form onSubmit={handleAddPost} className="add-post-form">
        <h2 className='title'>Add New Post</h2>
        <input
          type="text"
          placeholder="Title*"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          placeholder="Body*"
          name="body"
          value={form.body}
          onChange={handleChange}
          required
        />
        <select
          value={form.userId}
          name="userId"
          onChange={handleChange}
          required
        >
          <option value="">Select user*</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit" disabled={addingPost}>
          {addingPost ? "Adding..." : "Add Post"}
        </button>
      </form>
      </div>
  );
};

export default AddPostForm;