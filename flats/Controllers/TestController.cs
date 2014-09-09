using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace flats.Controllers
{
    public class TestController : ApiController
    {
        //
        // GET: /Test/

        public HttpResponseMessage Video()
        {
            //var video = VideoStream("D:\x21", "avi");

            var response = Request.CreateResponse();
            //response.Content = new PushStreamContent(video.WriteToStream, new MediaTypeHeaderValue("video/" + "avi"));

            return response;
        }

        public class VideoStream
        {
            private readonly string _filename;

            public VideoStream(string filename, string ext)
            {
                _filename = filename + "." + ext;
            }

            public async void WriteToStream(Stream outputStream, HttpContent content, TransportContext context)
            {
                try
                {
                    var buffer = new byte[65536];

                    using (var video = System.IO.File.Open(_filename, FileMode.Open, FileAccess.Read))
                    {
                        var length = (int)video.Length;
                        var bytesRead = 1;

                        while (length > 0 && bytesRead > 0)
                        {
                            bytesRead = video.Read(buffer, 0, Math.Min(length, buffer.Length));
                            await outputStream.WriteAsync(buffer, 0, bytesRead);
                            length -= bytesRead;
                        }
                    }
                }
                catch (HttpException)
                {
                    return;
                }
                finally
                {
                    outputStream.Close();
                }
            }
        }

    }
}
