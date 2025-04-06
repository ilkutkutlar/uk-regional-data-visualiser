shp_file="$1"
id_field="$2"

output_dir="$(dirname "${shp_file}")"
output_file="$(basename "${shp_file}" | sed 's/.zip/.geojson/g')"


SIMPLIFY_FACTOR='25.0%'

# Add this option for WGS84 maps
# -proj webmercator \
mapshaper \
  -i id-field="${id_field}" "${shp_file}" \
  -simplify weighted "${SIMPLIFY_FACTOR}" \
  -o format=geojson id-field="${id_field}" "${output_dir}/${output_file}"
