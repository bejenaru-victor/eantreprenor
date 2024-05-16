from PIL import Image
from io import BytesIO

def process_image(image, aspect_ratio=(16, 9), quality=70):
    img = Image.open(image)

    # Crop the image to the desired aspect ratio
    width, height = img.size
    target_width = width
    target_height = int(target_width / aspect_ratio[0] * aspect_ratio[1])

    if target_height > height:
        target_height = height
        target_width = int(target_height / aspect_ratio[1] * aspect_ratio[0])

    left = (width - target_width) / 2
    top = (height - target_height) / 2
    right = (width + target_width) / 2
    bottom = (height + target_height) / 2

    img = img.crop((left, top, right, bottom))

    # Compress the image
    output = BytesIO()
    img.save(output, format='JPEG', quality=quality)
    output.seek(0)