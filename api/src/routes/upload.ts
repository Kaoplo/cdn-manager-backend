import { Elysia, t} from "elysia";
import { uploadService } from "../services/upload.service";

export const uploadRoutes = new Elysia()
    .post(
        "/upload",
        async ({body}) => {
            const file = body.file as File;
            if (!file) return { error: "no file uploaded"};

            const video = await uploadService.handleUpload(file);
            if (!video) {
                return {error: "failed to upload"}
            }
            return {videoId: video.id, status: video.status};
        },
        {
            body: t.Object({
                file: t.Any()
            })
        }
    )