import React from "react";
import { Typography, Box, Card, CardMedia, CardContent, Divider, Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";

// Import các ảnh từ thư mục src/images
import kenobi1Img from "../../images/kenobi1.jpg"; 
import kenobi2Img from "../../images/kenobi2.jpg"; 
import ludgate1Img from "../../images/ludgate1.jpg"; 
import malcolm1Img from "../../images/malcolm1.jpg"; 
import malcolm2Img from "../../images/malcolm2.jpg"; 
import ousterImg from "../../images/ouster.jpg"; 
import ripley1Img from "../../images/ripley1.jpg"; 
import ripley2Img from "../../images/ripley2.jpg"; 
import took1Img from "../../images/took1.jpg"; 
import took2Img from "../../images/took2.jpg"; 

function UserPhotos() {
  const { userId } = useParams();
  
  // Lấy thông tin ảnh của user, thêm kiểm tra nếu dữ liệu chưa sẵn có
  const photos = models.photoOfUserModel(userId) || []; // Đảm bảo photos là mảng
  const user = models.userModel(userId);

  // Hàm để ánh xạ tên file ảnh
  const getImagePath = (fileName) => {
    switch (fileName) {
      case "kenobi1.jpg": return kenobi1Img;
      case "kenobi2.jpg": return kenobi2Img;
      case "ludgate1.jpg": return ludgate1Img;
      case "malcolm1.jpg": return malcolm1Img;
      case "malcolm2.jpg": return malcolm2Img;
      case "ouster.jpg": return ousterImg;
      case "ripley1.jpg": return ripley1Img;
      case "ripley2.jpg": return ripley2Img;
      case "took1.jpg": return took1Img;
      case "took2.jpg": return took2Img;
      default: return ousterImg; // Mặc định nếu không tìm thấy
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Photos of {user.first_name} {user.last_name}
      </Typography>

      {photos.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No photos available
        </Typography>
      ) : (
        photos.map((photo) => (
          <Card key={photo._id} sx={{ mb: 4, borderRadius: 2 }}>
            {/* Photo Section */}
            <CardMedia
              component="img"
              image={getImagePath(photo.file_name)} // Lấy đường dẫn ảnh từ file_name
              alt={`Photo by ${user.first_name}`}
              sx={{
                maxHeight: 500,
                objectFit: 'contain',
                backgroundColor: '#f5f5f5',
              }}
            />
            <CardContent>
              {/* Photo Metadata */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip 
                  label={photo.date_time} // Dùng thời gian của ảnh
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {(photo.comments?.length || 0)} comments
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Comments Section */}
              {Array.isArray(photo.comments) && photo.comments.length > 0 ? (
                <>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Comments
                  </Typography>
                  {photo.comments.map((comment) => (
                    <Box key={comment._id} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          {comment.comment}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No comments yet
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

export default UserPhotos;

