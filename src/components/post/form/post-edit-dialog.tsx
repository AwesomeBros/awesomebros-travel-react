import { useFindPostById, useUpdatePost } from "@/lib/query";
import { usePostEditOpenStore } from "@/lib/stores";
import type { PostFormSchema } from "@/lib/validations";
import type z from "zod/v3";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import PostForm from "./post-form";

export default function PostEditDialog() {
  const { isOpen, onClose, posts_id } = usePostEditOpenStore();
  const { mutate: updatePost } = useUpdatePost(posts_id);
  const { data: post, isLoading } = useFindPostById(posts_id);
  if (isLoading || !post) return null;
  // console.log("Post data:", post);

  const defaultValues: z.infer<typeof PostFormSchema> = {
    url: post.url || "",
    title: post.title || "",
    locations: post.locations || [],
    content: post.content || "",
    cities_id: post.cities_id || "",
    countries_id: post.countries_id || "",
    districts_id: post.districts_id || "",
    slug: post.slug || "",
  };
  function onSubmit(values: z.infer<typeof PostFormSchema>) {
    updatePost(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-lg text-center font-mediom leading-6 text-gray-900">
            글 수정하기
          </DialogTitle>
        </DialogHeader>
        <section className="w-full mx-auto px-4 min-h-[80vh] overflow-auto">
          <PostForm
            id={posts_id}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            isUpdateMode={true}
          />
        </section>
      </DialogContent>
    </Dialog>
  );
}
