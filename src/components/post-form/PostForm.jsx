import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    setIsSubmitting(true);
    try {
      let file = null;

      // Upload new image if selected
      if (data.image?.[0]) {
        file = await appwriteService.uploadFile(data.image[0]);

        if (!file?.$id) throw new Error("Image upload failed!");

        // Delete old image if updating
        if (post?.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
      }

      // Update post
      if (post) {
        const updatedPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });
        if (updatedPost) navigate(`/post/${updatedPost.$id}`);
      }
      // Create new post
      else {
        if (!file) throw new Error("Image is required for new post");

        if (!userData?.$id) {
          console.error("User not found");
          return;
        }

        const newPost = await appwriteService.createPost({
          ...data,
          featuredImage: file.$id,
          userId: userData.$id,
        });
        if (newPost) navigate(`/post/${newPost.$id}`);
      }
    } catch (error) {
      console.error("Submission Error:", error.message || error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col lg:flex-row gap-6 bg-[#f4f7f9] shadow-lg rounded-2xl p-6"
    >
      {/* Left Section */}
      <div className="w-full lg:w-2/3 space-y-4">
        <Input
          label="Title :"
          placeholder="Enter title here"
          className="mb-2"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="auto-generated-slug"
          className="mb-2"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/3 space-y-4">
        <div>
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />

          {post?.featuredImage && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFileView(post.featuredImage)}
                alt={post.title}
                className="rounded-xl border border-gray-300 shadow max-h-60 object-cover w-full"
              />
            </div>
          )}
        </div>

        {/* Status and Submit Button */}
        <div className="space-y-4">
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-2"
            {...register("status", { required: true })}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            bgColor={post ? "bg-green-600" : "bg-blue-600"}
            className="w-full py-2 rounded-lg text-white hover:opacity-90 transition duration-200"
          >
            {isSubmitting
              ? post
                ? "Updating..."
                : "Submitting..."
              : post
              ? "Update"
              : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}
