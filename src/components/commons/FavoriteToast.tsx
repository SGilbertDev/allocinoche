import React from "react";
import Portal from "@mui/material/Portal";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";

interface Props {
  showToast: boolean;
  setShowToast(show: boolean): void;
  isFavorite: boolean;
}

const TransitionUp = (props: SlideProps) => {
  return <Slide {...props} direction="up" />;
};

export default function FavoriteToast({
  showToast,
  setShowToast,
  isFavorite,
}: Props) {
  return (
    <Portal>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={showToast}
        onClose={() => setShowToast(false)}
        autoHideDuration={1500}
        TransitionComponent={TransitionUp}
      >
        <Alert severity="success" variant="filled">
          {isFavorite ? "Added to favorite" : "Removed from favorite"}
        </Alert>
      </Snackbar>
    </Portal>
  );
}
