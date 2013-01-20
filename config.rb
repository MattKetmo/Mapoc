#
# Compass configuration
#

http_path = (environment == :production) ? "/" : "../"

css_dir         = "css"
sass_dir        = "scss"
images_dir      = "images"
javascripts_dir = "javascripts"

line_comments = (environment == :production) ? false : true
output_style  = (environment == :production) ? :compressed : :nested
