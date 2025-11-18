export const useFileUploader = (inputRef, single, accept) => {
  const { t } = useI18n();

  const fileList = ref([]);
  const fileUrl = ref([]);
  const preloadedFiles = ref([]);
  const totalSize = ref(0);
  const totalLoaded = ref(0);
  const currentProgress = ref(0);
  const loading = ref(false);
  const uploadErrorMessage = ref("");
  const deletedArr = ref([]);

  const openDialog = (inputRef) => {
    inputRef.click();
  };

  /**
   * Process file and create blob URL
   * This is more efficient than base64, especially for videos
   */
  const processFile = (file) => {
    try {
      // Create blob URL instead of base64
      const blobUrl = URL.createObjectURL(file);
      fileUrl.value.push(blobUrl);
      currentProgress.value = 0;
    } catch (error) {
      uploadErrorMessage.value = t("file_upload_error");
      console.error("File processing error:", error);
    }
  };

  const handlePreloaded = async (preloaded) => {
    loading.value = true;

    const getFileType = (url) => {
      const extension = url.split(".").pop().toLowerCase();
      const extensionMap = {
        pdf: "application/pdf",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        webp: "image/webp",
        gif: "image/gif",
        mp4: "video/mp4",
        ogg: "video/ogg",
        mov: "video/quicktime",
        avi: "video/x-msvideo",
        wmv: "video/x-ms-wmv",
        flv: "video/x-flv",
      };
      return extensionMap[extension] || "application/octet-stream";
    };

    if (single) {
      if (!preloaded) {
        preloadedFiles.value = [];
      } else if (typeof preloaded === "string") {
        preloadedFiles.value = [
          {
            id: preloaded,
            name: preloaded.split("/").pop(),
            path: preloaded,
            url: preloaded,
            type: getFileType(preloaded),
          },
        ];
      } else if (preloaded?.path) {
        preloadedFiles.value = [
          {
            ...preloaded,
            type: getFileType(preloaded.path),
          },
        ];
      } else {
        preloadedFiles.value = [];
      }
    } else {
      preloadedFiles.value = (preloaded || []).map((file) => {
        const url = file.url;

        return {
          name: file.name,
          path: file.name,
          url: url,
          type: getFileType(url),
        };
      });
    }

    loading.value = false;
  };

  const handleSelected = async (inputRef, maxItems = 10) => {
    const selectedFiles = Array.from(inputRef.files);
    uploadErrorMessage.value = "";

    const allowedTypes = (inputRef.accept || "image/*")
      .split(",")
      .map((type) => type.trim());

    const isAccepted = (file) => {
      return allowedTypes.some((type) => {
        if (type.endsWith("/*")) {
          return file.type.startsWith(type.slice(0, -1));
        }
        return file.type === type;
      });
    };

    const invalidFiles = selectedFiles.filter((file) => !isAccepted(file));
    if (invalidFiles.length > 0) {
      uploadErrorMessage.value = `${invalidFiles[0].name} ${t(
        "file_not_allowed"
      )}`;

      return;
    }

    let filesToAdd = selectedFiles;

    if (single) {
      filesToAdd = [selectedFiles[0]];
      fileList.value = [];
      fileUrl.value = [];
      preloadedFiles.value = [];
    } else {
      const currentTotal = fileList.value.length + preloadedFiles.value.length;
      const allowedCount = maxItems - currentTotal;
      if (allowedCount <= 0) return;
      filesToAdd = selectedFiles.slice(0, allowedCount);
    }

    totalSize.value = filesToAdd.reduce((acc, file) => acc + file.size, 0);
    totalLoaded.value = 0;

    for (const file of filesToAdd) {
      processFile(file);
      fileList.value.push(file);
    }

    inputRef.value = "";
  };

  const deleteItem = (index, name, preloaded = false) => {
    if (preloaded) {
      preloadedFiles.value.splice(index, 1);
      if (single) deletedArr.value = name;
      else deletedArr.value.push(name);
      return;
    } else {
      // Revoke blob URL to free memory
      const urlToRevoke = fileUrl.value[index];
      if (urlToRevoke && urlToRevoke.startsWith("blob:")) {
        URL.revokeObjectURL(urlToRevoke);
      }

      fileUrl.value.splice(index, 1);
      fileList.value.splice(index, 1);
    }
  };

  const deleteAllItems = async (inputRef) => {
    // Revoke all blob URLs to free memory
    fileUrl.value.forEach((url) => {
      if (url && url.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    });

    fileList.value = [];
    fileUrl.value = [];
    totalSize.value = 0;
    totalLoaded.value = 0;
    currentProgress.value = 0;
    inputRef.value = "";
  };

  return {
    preloadedFiles,
    fileList,
    fileUrl,
    currentProgress,
    loading,
    uploadErrorMessage,
    deletedArr,
    openDialog,
    handlePreloaded,
    handleSelected,
    deleteItem,
    deleteAllItems,
  };
};
