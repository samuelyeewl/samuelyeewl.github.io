#!/bin/zsh

# Configuration
CLOUDINARY_CONFIG_FILE="images/cloudinary-account.json"

# --- Helper Functions ---

# Read JSON config using Python (Standard on macOS)
get_json_value() {
    file=$1
    key=$2
    python3 -c "import json, sys; data=json.load(open('$file')); print(data$key)" 2>/dev/null
}

# Resize image using sips (macOS built-in)
# Usage: resize_image "input.jpg" "output.jpg" max_width [max_height]
resize_image() {
    src="$1"
    dest="$2"
    max_w="$3"
    max_h="${4:-$max_w}" # Default to max_w if max_h not provided

    # Create destination directory
    mkdir -p "$(dirname "$dest")"

    # Check if destination exists and is newer than source (skip if not needed)
    if [[ -f "$dest" ]] && [[ "$dest" -nt "$src" ]]; then
        return
    fi

    echo "Generating $dest..."

    # Get current dimensions
    w=$(sips -g pixelWidth "$src" | awk '/pixelWidth/ {print $2}')
    h=$(sips -g pixelHeight "$src" | awk '/pixelHeight/ {print $2}')

    # Calculate target dimensions to fit within box (preserve aspect ratio)
    # If w/h > max_w/max_h (image is wider than box), constrain by width. Else, constrain by height.
    use_width=$(awk -v w="$w" -v h="$h" -v mw="$max_w" -v mh="$max_h" 'BEGIN { if (w/h > mw/mh) print 1; else print 0 }')

    if [[ "$use_width" -eq 1 ]]; then
        sips --resampleWidth "$max_w" "$src" --out "$dest" > /dev/null
    else
        sips --resampleHeight "$max_h" "$src" --out "$dest" > /dev/null
    fi
}

# Upload to Cloudinary
upload_image() {
    file="$1"
    width="$2"
    
    # Extract public_id: images/albums/foo.jpg -> albums/foo
    # Remove extension
    base="${file%.*}"
    # Remove leading images/
    public_id="${base#images/}"
    
    # Get config
    cloud_name=$(get_json_value "$CLOUDINARY_CONFIG_FILE" "['cloudName']")
    api_key=$(get_json_value "$CLOUDINARY_CONFIG_FILE" "['apiKey']")
    api_secret=$(get_json_value "$CLOUDINARY_CONFIG_FILE" "['apiSecret']")
    
    if [[ -z "$cloud_name" ]]; then
        echo "Error: Could not read Cloudinary config."
        exit 1
    fi

    timestamp=$(date +%s)
    
    # Signature generation:
    # params = "invalidate=true&overwrite=false&public_id=$public_id&timestamp=$timestamp&transformation=c_limit,q_90,w_$width"
    # sorted params string + api_secret -> sha1
    params_str="invalidate=true&overwrite=false&public_id=$public_id&timestamp=$timestamp&transformation=c_limit,q_90,w_$width"
    to_sign="$params_str$api_secret"
    
    signature=$(python3 -c "import hashlib; print(hashlib.sha1('$to_sign'.encode('utf-8')).hexdigest())")

    echo "Uploading $public_id..."

    # Upload
    curl -s -X POST "https://api.cloudinary.com/v1_1/$cloud_name/image/upload" \
        -F "file=@$file" \
        -F "api_key=$api_key" \
        -F "timestamp=$timestamp" \
        -F "public_id=$public_id" \
        -F "invalidate=true" \
        -F "overwrite=false" \
        -F "transformation=c_limit,q_90,w_$width" \
        -F "signature=$signature" > /dev/null
}

# --- Main Commands ---

cmd="$1"

if [[ "$cmd" == "resize" ]]; then
    echo "Starting Resize..."
    
    # Process Albums
    # Use zsh recursive globbing
    for f in images/albums/**/*.jpg(.N); do
        rel_path="${f#images/albums/}"
        dest_dir="images/_generated/albums/$(dirname "$rel_path")"
        filename=$(basename "$f")
        name="${filename%.*}"
        
        # Gallery Thumbs (144x144)
        resize_image "$f" "$dest_dir/${name}_thumb.jpg" 144 144
        
        # Gallery (850x600)
        resize_image "$f" "$dest_dir/$filename" 850 600
    done
    
    # Process Stories
    for f in images/stories/**/*.jpg(.N); do
        rel_path="${f#images/stories/}"
        dest_dir="images/_generated/stories/$(dirname "$rel_path")"
        filename=$(basename "$f")
        name="${filename%.*}"
        
        base_dest="$dest_dir/$name"
        
        resize_image "$f" "${base_dest}_2880.jpg" 2880
        resize_image "$f" "${base_dest}_1920.jpg" 1920
        resize_image "$f" "${base_dest}_1366.jpg" 1366
        resize_image "$f" "${base_dest}_850.jpg" 850
        resize_image "$f" "${base_dest}_420.jpg" 420
    done
    
    echo "Resize complete."
    
elif [[ "$cmd" == "upload" ]]; then
    echo "Starting Upload..."
    
    if [[ ! -f "$CLOUDINARY_CONFIG_FILE" ]]; then
        echo "Config file $CLOUDINARY_CONFIG_FILE not found!"
        exit 1
    fi
    
    # Albums
    for f in images/albums/**/*.jpg(.N); do
        upload_image "$f" 960
    done
    
    # Stories
    for f in images/stories/**/*.jpg(.N); do
        upload_image "$f" 2880
    done
    
    echo "Upload complete."

else
    echo "Usage: zsh scripts/manage_images.sh [resize|upload]"
fi
