shp_file="$1"
id_field="$2"
name_field="$3"
native_name_field="$4"

output_dir="$(dirname "${shp_file}")"
output_file="$(basename "${shp_file}" | sed 's/.zip/.geojson/g')"


SIMPLIFY_FACTOR='25.0%'

# Add this option for WGS84 maps
# -proj webmercator \
mapshaper "${shp_file}" \
  -simplify weighted "${SIMPLIFY_FACTOR}" \
  -filter-fields "${id_field},${name_field},${native_name_field}" \
  -rename-fields "name=${name_field},namew=${native_name_field},id=${id_field}" \
  -o format=geojson id-field="${id_field}" "${output_dir}/${output_file}"
