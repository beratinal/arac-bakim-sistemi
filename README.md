# Araç Bakım ve Teknik Servis Günlüğü

Bu uygulama, araç sahiplerinin periyodik bakımlarını ve servis geçmişlerini takip etmelerine olanak sağlar. ReactJS ve Tailwind CSS kullanılarak geliştirilmiştir.

## Özellikler

- **Bakım Kayıtları Ekleme**: Araç plakası, bakım türü, tarih, kilometre ve maliyet bilgilerini girerek yeni kayıt ekleyin.
- **Kayıtları Listeleme**: Eklenen bakım kayıtları kronolojik olarak kart şeklinde görüntülenir.
- **Kayıtları Güncelleme**: Mevcut kayıtları düzenleyin.
- **Kayıtları Silme**: Gereksiz kayıtları listeden kaldırın.
- **Responsive Tasarım**: Mobil ve masaüstü cihazlarda uyumlu arayüz.
- **Renkli Etiketler**: Bakım türüne göre farklı renklerde etiketler (Mekanik: Kırmızı, Periyodik: Yeşil, Elektrik: Sarı, Diğer: Gri).

## Teknolojiler

- ReactJS
- Tailwind CSS
- localStorage (veri saklama)

## Kurulum ve Çalıştırma

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Uygulamayı başlatın:
   ```bash
   npm start
   ```

3. Tarayıcıda `http://localhost:3000` adresine gidin.

## Yapılandırma

- **Tailwind CSS**: Stil için kullanılmıştır. `tailwind.config.js` dosyasında özelleştirebilirsiniz.
- **Veri Yönetimi**: Başlangıçta localStorage kullanılır. İleride backend entegrasyonu eklenebilir.

## Dağıtım

Netlify üzerinde yayına almak için:

1. `npm run build` komutu ile production build oluşturun.
2. `build` klasörünü Netlify'ye yükleyin.

## Geliştirme

- `src/Components/`: Bileşenler
- `src/Pages/`: Sayfalar
- `src/Interfaces/`: Veri yapıları

## Lisans

Bu proje açık kaynak kodludur.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
