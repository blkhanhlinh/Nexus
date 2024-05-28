# Sử dụng một image Docker chứa Node.js LTS trên Alpine Linux
FROM node:lts-alpine

# Thiết lập thư mục 'app' làm thư mục làm việc hiện tại
WORKDIR /app

# Sao chép cả 'package.json' và 'package-lock.json' (nếu có)
COPY package*.json ./

# Cài đặt các dependencies của dự án
RUN npm install

# Sao chép các file và thư mục của dự án vào thư mục làm việc hiện tại ('app')
COPY . .

# Build ứng dụng cho môi trường production với minification
RUN npm run build

# Mở cổng 8080 để truy cập ứng dụng Vue.js
EXPOSE 8080

# Lệnh chạy khi container được khởi chạy
CMD ["npm", "run", "build"]
