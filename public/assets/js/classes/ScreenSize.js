class ScreenSize {
    get screen() {
        let size = new Screen();
        
        if (size.getWidth() <= 600) {
            return 100;
        }

        if (size.getWidth() > 600 && size.getWidth() <= 768) {
            return 75;
        }

        if (size.getWidth() > 768 && size.getWidth() <= 992) {
            return 50;
        }

        if (size.getWidth() > 992 && size.getWidth() <= 1200) {
            return 50;
        }

        if (size.getWidth() > 1200 && size.getWidth() <= 1920) {
            return 50;
        }

        if (size.getWidth() > 1920) {
            return 25;
        }
    }
}