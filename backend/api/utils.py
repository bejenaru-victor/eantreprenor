from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile

def process_image(image, aspect_ratio=(16, 9), quality=70, width=None):
    img = Image.open(image)
    
    # Resize the image to the target width if specified
    if width and img.width > width:
        height = int((width / img.width) * img.height)
        img = img.resize((width, height), Image.LANCZOS)
    
    # Crop the image to the desired aspect ratio
    img_width, img_height = img.size
    target_width = img_width
    target_height = int(target_width / aspect_ratio[0] * aspect_ratio[1])
    
    if target_height > img_height:
        target_height = img_height
        target_width = int(target_height / aspect_ratio[1] * aspect_ratio[0])
    
    left = (img_width - target_width) / 2
    top = (img_height - target_height) / 2
    right = (img_width + target_width) / 2
    bottom = (img_height + target_height) / 2
    
    img = img.crop((left, top, right, bottom))
    
    # Compress the image
    output = BytesIO()
    img.save(output, format='JPEG', quality=quality)
    output.seek(0)
    
    return ContentFile(output.read(), image.name)